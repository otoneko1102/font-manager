import { decodePunycodeDomain, isDomainIgnored, base64ToArrayBuffer, fontNameFromFile } from "./utils";

chrome.storage.local.get(
  ["extensionEnabled", "ignoredDomains", "selectedFont"],
  (data) => {
    if (!data.extensionEnabled) return;

    const ignoredDomains = (data.ignoredDomains as string[]) || [];
    const selectedFont = (data.selectedFont as string) || "NotoSans.ttf";
    const currentDomain = decodePunycodeDomain(
      window.location.hostname.replace(/^www\./, "")
    );

    if (isDomainIgnored(currentDomain, ignoredDomains)) {
      console.log(
        `Font Manager is disabled for ${currentDomain} (Ignored List Match)`
      );
      return;
    }

    // Determine if this is a custom font or a built-in font
    const isCustom = selectedFont.startsWith("custom:");
    const fontName = isCustom
      ? selectedFont.slice("custom:".length)
      : fontNameFromFile(selectedFont);
    const storageKey = isCustom ? `customFont_${fontName}` : `font_${fontName}`;

    console.log(`Applying font: ${fontName} to ${currentDomain}${isCustom ? " (custom)" : ""}`);

    chrome.storage.local.get(storageKey, (fontData) => {
      const base64 = fontData[storageKey] as string | undefined;
      if (!base64) {
        console.log(`Font Manager: font "${fontName}" not available yet`);
        return;
      }

      const buffer = base64ToArrayBuffer(base64);

      const font = new FontFace("CustomFont", buffer);
      font
        .load()
        .then(() => {
          document.fonts.add(font);
          const style = document.createElement("style");
          style.textContent = `*:not([data-font-file]):not([data-font-preview]) { font-family: 'CustomFont', sans-serif !important; }`;
          document.documentElement.appendChild(style);
        })
        .catch((err) => {
          console.error(
            `Font Manager: failed to load font "${fontName}":`,
            err
          );
        });
    });
  }
);
