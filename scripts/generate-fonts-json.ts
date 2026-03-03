import { readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fontsDir = join(__dirname, "..", "fonts");
const outputPath = join(__dirname, "..", "fonts.json");
const srcOutputPath = join(__dirname, "..", "src", "fonts.json");

const fonts = readdirSync(fontsDir)
  .filter((f) => /\.(ttf|otf|woff2?)$/i.test(f))
  .sort((a, b) => a.localeCompare(b));

// Generate version from font list hash (first 8 chars of SHA-256)
const hash = createHash("sha256").update(fonts.join(",")).digest("hex").slice(0, 8);

const data = { version: hash, fonts };
const json = JSON.stringify(data, null, 2) + "\n";

writeFileSync(outputPath, json);
writeFileSync(srcOutputPath, json);

console.log(`Generated fonts.json (${fonts.length} fonts, version: ${hash})`);
