chrome.storage.local.get(["extensionEnabled", "ignoredDomains", "selectedFont"], (data) => {
  if (!data.extensionEnabled) return;

  const ignoredDomains = data.ignoredDomains || [];
  const selectedFont = data.selectedFont || "NotoSans.ttf";
  let currentDomain = window.location.hostname.replace(/^www\./, "");

  if (ignoredDomains.some(domain => domain === currentDomain)) {
    console.log(`Font is disabled for ${currentDomain} (Ignored List Match)`);
    return;
  }

  console.log(`Applying font: ${selectedFont} to ${currentDomain}`);

  const style = document.createElement("style");
  style.textContent = `
    @font-face {
      font-family: 'CustomFont';
      src: url('${chrome.runtime.getURL("fonts/" + selectedFont)}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    * {
      font-family: 'CustomFont', sans-serif !important;
    }
  `;
  document.documentElement.appendChild(style);
});
