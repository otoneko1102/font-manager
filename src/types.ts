export interface FontCatalog {
  version: string;
  fonts: string[];
}

export interface DownloadStatus {
  downloading: boolean;
  completed: number;
  total: number;
  current: string;
  failed: number;
}

export type MessageType =
  | { type: "downloadFont"; fontName: string }
  | { type: "downloadAllFonts" }
  | { type: "updateFontList" }
  | { type: "checkForUpdates" }
  | { type: "deleteAllFonts" };
