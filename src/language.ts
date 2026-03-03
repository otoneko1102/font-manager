const ids: Record<string, string> = {
  title: "Name",
  check: "Check",
  "font-management": "FontManagement",
  "download-all-btn": "DownloadAllFonts",
  "check-updates-btn": "CheckUpdates",
  "delete-fonts-btn": "DeleteFonts",
  "font-settings": "FontSettings",
  "save-font": "SaveFont",
  "reload-all-tabs": "ReloadAllTabs",
  "add-current-domain": "AddCurrentDomain",
  "add-yourself": "AddYourself",
  ignored: "Ignored",
  "th-domains": "ThDomains",
  "th-del": "ThDel",
  "custom-font-heading": "CustomFonts",
  "upload-label": "UploadFontLabel",
};

for (const [id, key] of Object.entries(ids)) {
  const el = document.getElementById(id);
  const msg = chrome.i18n.getMessage(key);
  if (el && msg) el.textContent = msg;
}

// innerHTML for elements with links
const requestEl = document.getElementById("request");
const requestMsg = chrome.i18n.getMessage("Request");
if (requestEl && requestMsg) requestEl.innerHTML = requestMsg;

// placeholder
const manualDomainEl = document.getElementById("manual-domain") as HTMLInputElement | null;
const manualDomainMsg = chrome.i18n.getMessage("ManualDomain");
if (manualDomainEl && manualDomainMsg) manualDomainEl.placeholder = manualDomainMsg;
