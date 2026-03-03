import { decodePunycodeDomain, isDomainIgnored, arrayBufferToBase64, base64ToArrayBuffer, fontNameFromFile } from "./utils";
import type { DownloadStatus } from "./types";
import "./language";

document.addEventListener("DOMContentLoaded", async () => {
  const toggleExtension = document.getElementById("toggle-extension") as HTMLInputElement;
  const fontSelect = document.getElementById("font-select") as HTMLSelectElement;
  const saveFontBtn = document.getElementById("save-font") as HTMLButtonElement;
  const domainText = document.getElementById("current-domain")!;
  const toggleBtn = document.getElementById("toggle-ignore") as HTMLButtonElement;
  const ignoredList = document.getElementById("ignored-list")!;
  const manualInput = document.getElementById("manual-domain") as HTMLInputElement;
  const addManualBtn = document.getElementById("add-manual") as HTMLButtonElement;
  const reloadAllTabsBtn = document.getElementById("reload-all-tabs") as HTMLButtonElement;
  const downloadAllBtn = document.getElementById("download-all-btn") as HTMLButtonElement;
  const checkUpdatesBtn = document.getElementById("check-updates-btn") as HTMLButtonElement;
  const deleteFontsBtn = document.getElementById("delete-fonts-btn") as HTMLButtonElement;
  const downloadStatusText = document.getElementById("download-status-text")!;
  const progressBarContainer = document.getElementById("progress-bar-container")!;
  const progressBar = document.getElementById("progress-bar")!;
  const fontUploadInput = document.getElementById("font-upload") as HTMLInputElement;
  const fontUploadBtn = document.getElementById("font-upload-btn") as HTMLButtonElement;
  const uploadStatus = document.getElementById("upload-status")!;
  const customFontList = document.getElementById("custom-font-list")!;

  reloadAllTabsBtn.addEventListener("click", () => {
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (tab.id) chrome.tabs.reload(tab.id);
      }
    });
  });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;

  const url = new URL(tab.url);
  const currentDomain = decodePunycodeDomain(
    url.hostname.replace(/^www\./, "")
  );

  domainText.textContent = `${chrome.i18n.getMessage("CurrentDomain")}: ${currentDomain}`;

  chrome.storage.local.get("extensionEnabled", (data) => {
    if (data.extensionEnabled === undefined) {
      chrome.storage.local.set({ extensionEnabled: true });
      toggleExtension.checked = true;
    } else {
      toggleExtension.checked = data.extensionEnabled as boolean;
    }
  });

  toggleExtension.addEventListener("change", () => {
    chrome.storage.local.set(
      { extensionEnabled: toggleExtension.checked },
      () => reloadCurrentTab()
    );
  });

  // ----- Font loading -----

  async function loadFonts(): Promise<void> {
    const data = await chrome.storage.local.get([
      "availableFonts",
      "installedFonts",
      "selectedFont",
      "customFonts",
    ]);
    let availableFonts = (data.availableFonts as string[]) || [];
    const installedFonts = (data.installedFonts as string[]) || [];
    const customFonts = (data.customFonts as string[]) || [];
    const selectedFont = (data.selectedFont as string) || "NotoSans.ttf";

    if (availableFonts.length === 0) {
      const result = await chrome.runtime.sendMessage({
        type: "updateFontList",
      });
      if (result?.data?.fonts) {
        availableFonts = result.data.fonts;
      }
    }

    availableFonts.sort((a, b) => {
      const aN = fontNameFromFile(a);
      const bN = fontNameFromFile(b);
      if (aN === "NotoSans") return -1;
      if (bN === "NotoSans") return 1;
      const aInst = installedFonts.includes(aN);
      const bInst = installedFonts.includes(bN);
      if (aInst && !bInst) return -1;
      if (!aInst && bInst) return 1;
      return aN.localeCompare(bN);
    });

    fontSelect.innerHTML = "";

    const FONT_BASE_URL =
      "https://raw.githubusercontent.com/otoneko1102/font-manager/main/fonts/";
    const loadedPreviewFonts = new Set<string>();

    // Helper: load a font from storage and apply to an element
    function applyFontPreview(storageKey: string, fontId: string, el: HTMLElement): void {
      chrome.storage.local.get(storageKey, (fontData) => {
        const base64 = fontData[storageKey] as string | undefined;
        if (!base64) return;
        const buffer = base64ToArrayBuffer(base64);
        const face = new FontFace(fontId, buffer);
        face.load().then(() => {
          document.fonts.add(face);
          el.style.fontFamily = `'${fontId}', sans-serif`;
          if (el === fontSelect.selectedOptions[0]) {
            const sample = document.getElementById("font-preview-sample");
            if (sample) sample.style.fontFamily = `'${fontId}', sans-serif`;
          }
        }).catch(() => {});
      });
    }

    // Helper: load a font from remote URL and apply to an element
    function applyRemoteFontPreview(fontFile: string, fontId: string, el: HTMLElement, name: string): void {
      // Show loading indicator
      el.textContent = `${name} ⏳`;
      if (loadedPreviewFonts.has(fontId)) {
        el.style.fontFamily = `'${fontId}', sans-serif`;
        el.textContent = `${name} ⬇  AaBbCc 123 あア`;
        if (el === fontSelect.selectedOptions[0]) {
          const sample = document.getElementById("font-preview-sample");
          if (sample) sample.style.fontFamily = `'${fontId}', sans-serif`;
        }
        return;
      }
      loadedPreviewFonts.add(fontId);
      const url = `${FONT_BASE_URL}${encodeURIComponent(fontFile)}`;
      const face = new FontFace(fontId, `url('${url}')`);
      face.load().then(() => {
        document.fonts.add(face);
        el.style.fontFamily = `'${fontId}', sans-serif`;
        el.textContent = `${name} ⬇  AaBbCc 123 あア`;
        if (el === fontSelect.selectedOptions[0]) {
          const sample = document.getElementById("font-preview-sample");
          if (sample) sample.style.fontFamily = `'${fontId}', sans-serif`;
        }
      }).catch(() => {
        el.textContent = `${name} ⬇`;
      });
    }

    // Add custom fonts at the top
    for (const name of customFonts) {
      const option = document.createElement("option");
      option.value = `custom:${name}`;
      option.textContent = `⭐ ${name}  AaBbCc 123 あア`;
      fontSelect.appendChild(option);
      applyFontPreview(`customFont_${name}`, `FP_c_${name}`, option);
    }

    // Add separator if both custom and available exist
    if (customFonts.length > 0 && availableFonts.length > 0) {
      const sep = document.createElement("option");
      sep.disabled = true;
      sep.textContent = "──────────";
      fontSelect.appendChild(sep);
    }

    for (const fontFile of availableFonts) {
      const name = fontNameFromFile(fontFile);
      const option = document.createElement("option");
      option.value = fontFile;
      const isInstalled = installedFonts.includes(name);
      option.textContent = isInstalled ? `${name} ✓  AaBbCc 123 あア` : `${name} ⬇`;
      if (!isInstalled) option.style.opacity = "0.6";
      fontSelect.appendChild(option);
      if (isInstalled) {
        applyFontPreview(`font_${name}`, `FP_${name}`, option);
      } else {
        applyRemoteFontPreview(fontFile, `FP_${name}`, option, name);
      }
    }

    fontSelect.value = selectedFont;
    if (!fontSelect.value && availableFonts.length > 0) {
      fontSelect.value = availableFonts[0];
    }

    // Apply preview font to the select element itself and the sample text
    const fontPreviewSample = document.getElementById("font-preview-sample");
    function updateSelectPreview(): void {
      const selected = fontSelect.selectedOptions[0];
      if (selected) {
        const ff = selected.style.fontFamily || "";
        fontSelect.style.fontFamily = ff;
        if (fontPreviewSample) fontPreviewSample.style.fontFamily = ff;
      }
    }
    fontSelect.addEventListener("change", updateSelectPreview);
    // Delay to wait for font previews to load
    setTimeout(updateSelectPreview, 300);

    chrome.storage.local.set({ selectedFont: fontSelect.value || selectedFont });
    updateDownloadStatus();
    updateCustomFontList();
  }

  // ----- Save font -----

  saveFontBtn.addEventListener("click", async () => {
    const selectedFont = fontSelect.value;

    // Custom fonts are already stored locally — no download needed
    if (selectedFont.startsWith("custom:")) {
      chrome.storage.local.set({ selectedFont }, () => {
        reloadCurrentTab();
        loadFonts();
      });
      return;
    }

    const fontName = fontNameFromFile(selectedFont);

    const data = await chrome.storage.local.get("installedFonts");
    const installed = (data.installedFonts as string[]) || [];

    if (!installed.includes(fontName)) {
      saveFontBtn.disabled = true;
      saveFontBtn.textContent = "⬇ ...";
      const result = await chrome.runtime.sendMessage({
        type: "downloadFont",
        fontFile: selectedFont,
      });
      saveFontBtn.disabled = false;
      saveFontBtn.textContent =
        chrome.i18n.getMessage("SaveFont") || "Save";

      if (!result?.success) {
        downloadStatusText.textContent =
          chrome.i18n.getMessage("DownloadError") ||
          "Download failed. Please try again.";
        return;
      }
    }

    chrome.storage.local.set({ selectedFont }, () => {
      reloadCurrentTab();
      loadFonts();
    });
  });

  // ----- Download buttons -----

  downloadAllBtn.addEventListener("click", async () => {
    downloadAllBtn.disabled = true;
    progressBarContainer.style.display = "block";
    downloadStatusText.textContent =
      chrome.i18n.getMessage("Downloading") || "Downloading fonts...";

    chrome.runtime
      .sendMessage({ type: "downloadAllFonts" })
      .then((result) => {
        downloadAllBtn.disabled = false;
        if (result) {
          downloadStatusText.textContent =
            (chrome.i18n.getMessage("DownloadComplete") ||
              "Download complete!") +
            ` (${result.completed}/${result.total}` +
            (result.failed > 0 ? `, ${result.failed} failed` : "") +
            ")";
        }
        progressBarContainer.style.display = "none";
        loadFonts();
      });

    const progressInterval = setInterval(async () => {
      const status = await chrome.storage.local.get("downloadStatus");
      const ds = status.downloadStatus as DownloadStatus | undefined;
      if (ds) {
        if (ds.downloading) {
          const pct =
            ds.total > 0
              ? Math.round((ds.completed / ds.total) * 100)
              : 0;
          progressBar.style.width = `${pct}%`;
          downloadStatusText.textContent = `${chrome.i18n.getMessage("Downloading") || "Downloading..."} ${ds.completed}/${ds.total}`;
        } else {
          clearInterval(progressInterval);
        }
      }
    }, 1000);
  });

  checkUpdatesBtn.addEventListener("click", async () => {
    checkUpdatesBtn.disabled = true;
    checkUpdatesBtn.textContent = "...";

    const result = await chrome.runtime.sendMessage({
      type: "checkForUpdates",
    });
    checkUpdatesBtn.disabled = false;
    checkUpdatesBtn.textContent =
      chrome.i18n.getMessage("CheckUpdates") || "Check for Updates";

    if (result?.hasUpdate) {
      downloadStatusText.textContent =
        chrome.i18n.getMessage("NewFontsAvailable") ||
        "New fonts are available!";
      await chrome.runtime.sendMessage({ type: "updateFontList" });
      loadFonts();
    } else {
      downloadStatusText.textContent =
        chrome.i18n.getMessage("UpToDate") || "All fonts are up to date.";
    }
  });

  deleteFontsBtn.addEventListener("click", async () => {
    if (
      !confirm(
        chrome.i18n.getMessage("ConfirmDeleteFonts") ||
          "Delete all downloaded fonts?"
      )
    )
      return;
    deleteFontsBtn.disabled = true;
    await chrome.runtime.sendMessage({ type: "deleteAllFonts" });
    deleteFontsBtn.disabled = false;
    downloadStatusText.textContent =
      chrome.i18n.getMessage("FontsDeleted") || "All fonts deleted.";
    loadFonts();
  });

  // ----- Download status -----

  async function updateDownloadStatus(): Promise<void> {
    const data = await chrome.storage.local.get([
      "installedFonts",
      "availableFonts",
      "downloadStatus",
    ]);
    const installed = ((data.installedFonts as string[]) || []).length;
    const available = ((data.availableFonts as string[]) || []).length;
    const ds = data.downloadStatus as DownloadStatus | undefined;

    if (ds?.downloading) {
      progressBarContainer.style.display = "block";
      const pct =
        ds.total > 0 ? Math.round((ds.completed / ds.total) * 100) : 0;
      progressBar.style.width = `${pct}%`;
      downloadStatusText.textContent = `${chrome.i18n.getMessage("Downloading") || "Downloading..."} ${ds.completed}/${ds.total}`;
    } else {
      progressBarContainer.style.display = "none";
      if (available > 0) {
        downloadStatusText.textContent = `${chrome.i18n.getMessage("FontsInstalled") || "Installed"}: ${installed}/${available}`;
      } else {
        downloadStatusText.textContent =
          chrome.i18n.getMessage("FontsNotLoaded") ||
          "Font list not loaded yet.";
      }
    }
  }

  // ----- Ignored domains -----

  function updateIgnoredList(ignoredDomains: string[]): void {
    ignoredList.innerHTML = "";

    for (const ignoredDomain of ignoredDomains) {
      const row = document.createElement("tr");

      const domainCell = document.createElement("td");
      domainCell.textContent = ignoredDomain;

      const removeCell = document.createElement("td");
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => {
        const updatedDomains = ignoredDomains.filter(
          (d) => d !== ignoredDomain
        );
        chrome.storage.local.set(
          { ignoredDomains: updatedDomains },
          () => {
            updateIgnoredList(updatedDomains);
            if (isDomainIgnored(currentDomain, [ignoredDomain])) {
              reloadCurrentTab();
            }
          }
        );
      });

      removeCell.appendChild(removeBtn);
      row.appendChild(domainCell);
      row.appendChild(removeCell);
      ignoredList.appendChild(row);
    }

    toggleBtn.textContent = ignoredDomains.includes(currentDomain)
      ? chrome.i18n.getMessage("Remove")
      : chrome.i18n.getMessage("Add");
  }

  chrome.storage.local.get(["selectedFont", "ignoredDomains"], (data) => {
    if (!data.selectedFont) {
      chrome.storage.local.set({ selectedFont: "NotoSans.ttf" });
    }
    fontSelect.value = (data.selectedFont as string) || "NotoSans.ttf";
    updateIgnoredList((data.ignoredDomains as string[]) || []);
  });

  toggleBtn.addEventListener("click", () => {
    chrome.storage.local.get("ignoredDomains", (data) => {
      let ignoredDomains = (data.ignoredDomains as string[]) || [];
      if (ignoredDomains.includes(currentDomain)) {
        ignoredDomains = ignoredDomains.filter((d) => d !== currentDomain);
      } else {
        ignoredDomains.push(currentDomain);
      }
      chrome.storage.local.set({ ignoredDomains }, () => {
        updateIgnoredList(ignoredDomains);
        reloadCurrentTab();
      });
    });
  });

  // ----- Manual domain -----

  function addManualDomain(): void {
    let manualDomain = manualInput.value
      .trim()
      .replace(/https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*/, "");
    if (!manualDomain) return;

    manualDomain = decodePunycodeDomain(manualDomain);

    chrome.storage.local.get("ignoredDomains", (data) => {
      const ignoredDomains = (data.ignoredDomains as string[]) || [];
      if (!ignoredDomains.includes(manualDomain)) {
        ignoredDomains.push(manualDomain);
        chrome.storage.local.set({ ignoredDomains }, () => {
          updateIgnoredList(ignoredDomains);
        });
      }
      manualInput.value = "";
    });
  }

  addManualBtn.addEventListener("click", addManualDomain);
  manualInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addManualDomain();
    }
  });

  // ----- Custom Font Upload -----

  fontUploadBtn.addEventListener("click", () => {
    fontUploadInput.click();
  });

  fontUploadInput.addEventListener("change", async () => {
    const file = fontUploadInput.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      uploadStatus.textContent =
        chrome.i18n.getMessage("FileTooLarge") || "File too large (max 10 MB).";
      return;
    }

    const validExts = [".ttf", ".otf", ".woff", ".woff2"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExts.includes(ext)) {
      uploadStatus.textContent =
        chrome.i18n.getMessage("InvalidFontFile") ||
        "Invalid file type. Supported: .ttf, .otf, .woff, .woff2";
      return;
    }

    // Use filename without extension as font name
    const fontName = file.name.substring(0, file.name.lastIndexOf(".")).replace(/[^a-zA-Z0-9_\-\u3000-\u9FFF\uAC00-\uD7AF]/g, "_");

    uploadStatus.textContent =
      chrome.i18n.getMessage("Uploading") || "Uploading...";

    try {
      const buffer = await file.arrayBuffer();
      const base64 = arrayBufferToBase64(buffer);

      await chrome.storage.local.set({ [`customFont_${fontName}`]: base64 });

      const data = await chrome.storage.local.get("customFonts");
      const customFonts = (data.customFonts as string[]) || [];
      if (!customFonts.includes(fontName)) {
        customFonts.push(fontName);
        await chrome.storage.local.set({ customFonts });
      }

      uploadStatus.textContent =
        (chrome.i18n.getMessage("UploadComplete") || "Uploaded:") +
        ` ${fontName}`;
      fontUploadInput.value = "";
      loadFonts();
    } catch (err) {
      console.error("Font upload failed:", err);
      uploadStatus.textContent =
        chrome.i18n.getMessage("UploadError") || "Upload failed.";
    }
  });

  function updateCustomFontList(): void {
    chrome.storage.local.get("customFonts", (data) => {
      const customFonts = (data.customFonts as string[]) || [];
      customFontList.innerHTML = "";

      for (const name of customFonts) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "custom-font-name";
        span.textContent = name;

        // Apply font preview to custom font name
        const storageKey = `customFont_${name}`;
        chrome.storage.local.get(storageKey, (fontData) => {
          const base64 = fontData[storageKey] as string | undefined;
          if (!base64) return;
          const buffer = base64ToArrayBuffer(base64);
          const fontId = `FP_cl_${name}`;
          const face = new FontFace(fontId, buffer);
          face.load().then(() => {
            document.fonts.add(face);
            span.style.fontFamily = `'${fontId}', sans-serif`;
          }).catch(() => {});
        });

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-custom-btn";
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", async () => {
          const updated = customFonts.filter((f) => f !== name);
          await chrome.storage.local.remove(`customFont_${name}`);
          await chrome.storage.local.set({ customFonts: updated });

          // If the deleted font was selected, fall back to default
          const stored = await chrome.storage.local.get("selectedFont");
          if (stored.selectedFont === `custom:${name}`) {
            await chrome.storage.local.set({ selectedFont: "NotoSans.ttf" });
          }

          loadFonts();
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        customFontList.appendChild(li);
      }
    });
  }

  // ----- Helpers -----

  function reloadCurrentTab(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }

  await loadFonts();
});
