import { arrayBufferToBase64 } from "./utils";
import type { FontCatalog, DownloadStatus } from "./types";

// =============================================================
// Font Manager - Background Service Worker
// =============================================================

const GITHUB_REPO = "otoneko1102/font-manager";
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/`;
const FONTS_JSON_URL = `${GITHUB_RAW_BASE}fonts.json`;
const FONTS_DIR_URL = `${GITHUB_RAW_BASE}fonts/`;
const CHECK_INTERVAL_MINUTES = 60 * 24; // 1 day

// ----- Lifecycle Events -----

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: `https://font-manager.commonjs.work/${chrome.i18n.getMessage("Index") || "en"}.html`,
    });
    await chrome.storage.local.set({ extensionEnabled: true });

    const catalog = await fetchFontCatalog();
    if (catalog) {
      await downloadFont("NotoSans");
    }
  }

  if (details.reason === "update") {
    await fetchFontCatalog();
  }

  chrome.alarms.create("checkFontUpdates", {
    periodInMinutes: CHECK_INTERVAL_MINUTES,
  });
});

chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.local.get("downloadStatus");
  const ds = data.downloadStatus as DownloadStatus | undefined;
  if (ds?.downloading) {
    await downloadAllFonts();
  }
});

// ----- Alarm Handler -----

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "checkFontUpdates") {
    const hasUpdate = await checkForUpdates();
    if (hasUpdate) {
      chrome.notifications.create("fontUpdate", {
        type: "basic",
        iconUrl: "icons/128x128.png",
        title: chrome.i18n.getMessage("Name") || "Font Manager",
        message:
          chrome.i18n.getMessage("NewFontsAvailable") ||
          "New fonts are available! Open the extension to update.",
      });
    }
  }
});

chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId === "fontUpdate") {
    chrome.notifications.clear(notificationId);
  }
});

// ----- Storage Change Listener -----

chrome.storage.onChanged.addListener((changes) => {
  if (changes.selectedFont || changes.ignoredDomains) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) return;
      if (!tabs || tabs.length === 0) return;

      for (const tab of tabs) {
        if (tab.id !== undefined) {
          try {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["content.js"],
            });
          } catch {
            // ignore
          }
        }
      }
    });
  }
});

// ----- Message Handling -----

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "downloadFont") {
    downloadFont(message.fontName).then((success) => {
      sendResponse({ success });
    });
    return true;
  }

  if (message.type === "downloadAllFonts") {
    downloadAllFonts().then((result) => {
      sendResponse(result);
    });
    return true;
  }

  if (message.type === "updateFontList") {
    fetchFontCatalog().then((data) => {
      sendResponse({ success: !!data, data });
    });
    return true;
  }

  if (message.type === "checkForUpdates") {
    checkForUpdates().then((hasUpdate) => {
      sendResponse({ hasUpdate });
    });
    return true;
  }

  if (message.type === "deleteAllFonts") {
    deleteAllFonts().then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// ----- Font Catalog -----

async function fetchFontCatalog(): Promise<FontCatalog | null> {
  try {
    const response = await fetch(FONTS_JSON_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: FontCatalog = await response.json();

    await chrome.storage.local.set({
      availableFonts: data.fonts,
      remoteFontsVersion: data.version,
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch font catalog:", error);

    try {
      const localResponse = await fetch(chrome.runtime.getURL("fonts.json"));
      const localData: FontCatalog = await localResponse.json();
      const stored = await chrome.storage.local.get("availableFonts");
      if (!stored.availableFonts) {
        await chrome.storage.local.set({
          availableFonts: localData.fonts,
          remoteFontsVersion: localData.version,
        });
      }
      return localData;
    } catch {
      return null;
    }
  }
}

async function checkForUpdates(): Promise<boolean> {
  const stored = await chrome.storage.local.get([
    "remoteFontsVersion",
    "installedFonts",
    "availableFonts",
  ]);
  const oldVersion = stored.remoteFontsVersion as string | undefined;
  const installedFonts = (stored.installedFonts as string[]) || [];

  const newData = await fetchFontCatalog();
  if (!newData) return false;

  if (oldVersion !== newData.version) return true;

  const newFonts = newData.fonts.filter((f) => !installedFonts.includes(f));
  return newFonts.length > 0;
}

// ----- Font Download -----

async function downloadFont(fontName: string): Promise<boolean> {
  try {
    const url = `${FONTS_DIR_URL}${fontName}.ttf`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);

    await chrome.storage.local.set({ [`font_${fontName}`]: base64 });

    const data = await chrome.storage.local.get("installedFonts");
    const installed = (data.installedFonts as string[]) || [];
    if (!installed.includes(fontName)) {
      installed.push(fontName);
      await chrome.storage.local.set({ installedFonts: installed });
    }

    return true;
  } catch (error) {
    console.error(`Failed to download font ${fontName}:`, error);
    return false;
  }
}

async function downloadAllFonts(): Promise<{
  completed: number;
  total: number;
  failed: number;
}> {
  const data = await chrome.storage.local.get([
    "availableFonts",
    "installedFonts",
  ]);
  const available = (data.availableFonts as string[]) || [];
  const installed = (data.installedFonts as string[]) || [];
  const toDownload = available.filter((f) => !installed.includes(f));

  const total = toDownload.length;
  let completed = 0;
  let failed = 0;

  await chrome.storage.local.set({
    downloadStatus: {
      downloading: true,
      completed: 0,
      total,
      current: "",
      failed: 0,
    } satisfies DownloadStatus,
  });

  for (const fontName of toDownload) {
    const success = await downloadFont(fontName);
    completed++;
    if (!success) failed++;

    await chrome.storage.local.set({
      downloadStatus: {
        downloading: completed < total,
        completed,
        total,
        current: fontName,
        failed,
      } satisfies DownloadStatus,
    });
  }

  await chrome.storage.local.set({
    downloadStatus: {
      downloading: false,
      completed: total,
      total,
      current: "",
      failed,
    } satisfies DownloadStatus,
  });

  return { completed: total - failed, total, failed };
}

async function deleteAllFonts(): Promise<void> {
  const data = await chrome.storage.local.get("installedFonts");
  const installed = (data.installedFonts as string[]) || [];

  const keysToRemove = installed.map((name) => `font_${name}`);
  await chrome.storage.local.remove(keysToRemove);
  await chrome.storage.local.set({
    installedFonts: [],
    downloadStatus: null,
  });
}
