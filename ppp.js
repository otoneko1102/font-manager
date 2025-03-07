document.addEventListener("DOMContentLoaded", async () => {
  const toggleExtension = document.getElementById("toggle-extension");
  const fontSelect = document.getElementById("font-select");
  const saveFontBtn = document.getElementById("save-font");
  const domainText = document.getElementById("current-domain");
  const toggleBtn = document.getElementById("toggle-ignore");
  const ignoredList = document.getElementById("ignored-list");
  const manualInput = document.getElementById("manual-domain");
  const addManualBtn = document.getElementById("add-manual");
  const reloadAllTabsBtn = document.getElementById("reload-all-tabs");

  reloadAllTabsBtn.addEventListener("click", () => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.id) {
          chrome.tabs.reload(tab.id);
        }
      });
    });
  });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) return;

  const url = new URL(tab.url);
  let currentDomain = url.hostname.replace(/^www\./, "");
  domainText.textContent = `Current Domain: ${currentDomain}`;

  chrome.storage.local.get("extensionEnabled", (data) => {
    if (data.extensionEnabled === undefined) {
      chrome.storage.local.set({ extensionEnabled: true });
      toggleExtension.checked = true;
    } else {
      toggleExtension.checked = data.extensionEnabled;
    }
  });

  toggleExtension.addEventListener("change", () => {
    chrome.storage.local.set({ extensionEnabled: toggleExtension.checked }, () => {
      reloadCurrentTab();
    });
  });

  async function loadFontsFromManifest() {
    const manifest = await chrome.runtime.getManifest();
    const fontPaths = manifest.web_accessible_resources[0].resources.filter(path => path.startsWith("fonts/"));
    let fontNames = fontPaths.map(path => path.replace("fonts/", "").replace(".ttf", ""));

    fontNames = fontNames.sort((a, b) => (a === "NotoSans" ? -1 : b === "NotoSans" ? 1 : 0));

    fontSelect.innerHTML = "";
    const styleElement = document.createElement("style");

    fontNames.forEach(font => {
      const fontPath = chrome.runtime.getURL(`fonts/${font}.ttf`);
      const fontFamily = `Font_${font.replace(/[^a-zA-Z0-9]/g, "_")}`;

      styleElement.textContent += `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontPath}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `;

      const option = document.createElement("option");
      option.value = `${font}.ttf`;
      option.textContent = font;
      option.style.fontFamily = `'${fontFamily}', sans-serif`;

      fontSelect.appendChild(option);
    });

    document.head.appendChild(styleElement);

    chrome.storage.local.get("selectedFont", (data) => {
      const selectedFont = data.selectedFont || "NotoSans.ttf";
      fontSelect.value = selectedFont;
      chrome.storage.local.set({ selectedFont });
    });
  }

  saveFontBtn.addEventListener("click", () => {
    const selectedFont = fontSelect.value;
    chrome.storage.local.set({ selectedFont }, () => {
      reloadCurrentTab();
    });
  });

  function reloadCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }

  await loadFontsFromManifest();
});
