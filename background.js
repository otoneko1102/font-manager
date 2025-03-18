chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: `https://font-manager.commonjs.work/${chrome.i18n.getMessage('Index') || 'en'}.html` });
  }

  if (details.reason === "update") {
    // chrome.tabs.create({ url: `https://font-manager.commonjs.work/${chrome.i18n.getMessage('Index') || 'en'}.html` });
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.selectedFont || changes.ignoredDomains) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) return;
      if (!tabs || tabs.length === 0) return;

      tabs.forEach(tab => {
        if (tab.id !== undefined) {
          try {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["content.js"]
            });
          } catch {}
        }
      });
    });
  }
});
