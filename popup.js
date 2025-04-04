function punycodeToUnicode(domain) {
  const base = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;
  const delimiter = '-';

  let output = [];
  let input = domain.split('');
  let i = domain.lastIndexOf(delimiter);
  let n = initialN;
  let bias = initialBias;
  let index = 0;

  if (i > 0) {
    output = input.slice(0, i);
    input = input.slice(i + 1);
  }

  while (input.length > 0) {
    let oldi = index;
    let w = 1;

    for (let k = base; ; k += base) {
      const charCode = input.shift().charCodeAt(0);
      const digit = charCode - (charCode < 58 ? 22 : charCode < 91 ? 65 : 97);
      index += digit * w;

      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

      if (digit < t) break;
      w *= base - t;
    }

    bias = adapt(index - oldi, output.length + 1, oldi === 0);
    n += Math.floor(index / (output.length + 1));
    index %= output.length + 1;
    output.splice(index++, 0, String.fromCharCode(n));
  }

  return output.join('');

  function adapt(delta, numPoints, firstTime) {
    delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
    delta += Math.floor(delta / numPoints);
    let k = 0;
    while (delta > (((base - tMin) * tMax) >> 1)) {
      delta = Math.floor(delta / (base - tMin));
      k += base;
    }
    return k + Math.floor((base - tMin + 1) * delta / (delta + skew));
  }
}

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

  const punycodepattern = /\bxn--/i;
  if (punycodepattern.test(currentDomain)) {
    currentDomain = currentDomain
      .split('.')
      .map(part => (part.startsWith("xn--") ? punycodeToUnicode(part.slice(4)) : part))
      .join('.');
  }

  domainText.textContent = `${chrome.i18n.getMessage('CurrentDomain')}: ${currentDomain}`;

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

      fontSelect.style.fontFamily = `'Font_${selectedFont.replace(/[^a-zA-Z0-9]/g, "_")}', sans-serif`;

      chrome.storage.local.set({ selectedFont });
    });
  }

  saveFontBtn.addEventListener("click", () => {
    const selectedFont = fontSelect.value;
    chrome.storage.local.set({ selectedFont }, () => {
      fontSelect.style.fontFamily = `'Font_${selectedFont.replace(/[^a-zA-Z0-9]/g, "_")}', sans-serif`;
      reloadCurrentTab();
    });
  });

  function updateIgnoredList(ignoredDomains) {
    ignoredList.innerHTML = "";

    ignoredDomains.forEach((ignoredDomain) => {
      const row = document.createElement("tr");

      const domainCell = document.createElement("td");
      domainCell.textContent = ignoredDomain;

      const removeCell = document.createElement("td");
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => {
        const updatedDomains = ignoredDomains.filter((d) => d !== ignoredDomain);
        chrome.storage.local.set({ ignoredDomains: updatedDomains }, () => {
          updateIgnoredList(updatedDomains);

          if (
            ignoredDomain === currentDomain ||
            (
              ignoredDomain.startsWith("*.") &&
              `.${currentDomain}`.endsWith(ignoredDomain.replace("*", ""))
            ) ||
            (
              ignoredDomain.endsWith(".*") &&
              `${currentDomain}.`.startsWith(ignoredDomain.replace("*", ""))
            ) ||
            (
              ignoredDomain.startsWith("*.") &&
              ignoredDomain.endsWith(".*") &&
              `.${currentDomain}.`.includes(ignoredDomain.replace(/\*/g, ""))
            )
          ) {
            reloadCurrentTab();
          }
        });
      });

      removeCell.appendChild(removeBtn);
      row.appendChild(domainCell);
      row.appendChild(removeCell);
      ignoredList.appendChild(row);
    });

    toggleBtn.textContent = ignoredDomains.includes(currentDomain) ? chrome.i18n.getMessage('Remove') : chrome.i18n.getMessage('Add');
  }

  chrome.storage.local.get(["selectedFont", "ignoredDomains"], (data) => {
    if (!data.selectedFont) {
      chrome.storage.local.set({ selectedFont: "NotoSans.ttf" });
    }
    fontSelect.value = data.selectedFont || "NotoSans.ttf";
    updateIgnoredList(data.ignoredDomains || []);
  });

  toggleBtn.addEventListener("click", () => {
    chrome.storage.local.get("ignoredDomains", (data) => {
      let ignoredDomains = data.ignoredDomains || [];
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

  function addManualDomain() {
    let manualDomain = manualInput.value
      .trim()
      .replace(/https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*/, "");
    if (!manualDomain) return;

    const punycodePattern = /\bxn--/i;
    if (punycodePattern.test(manualDomain)) {
      manualDomain = manualDomain
        .split('.')
        .map(part => (part.startsWith("xn--") ? punycodeToUnicode(part.slice(4)) : part))
        .join('.')
    }

    chrome.storage.local.get("ignoredDomains", (data) => {
      let ignoredDomains = data.ignoredDomains || [];
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

  function reloadCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }

  await loadFontsFromManifest();
});
