const BASE = 36;
const T_MIN = 1;
const T_MAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128;
const DELIMITER = "-";

function adapt(delta: number, numPoints: number, firstTime: boolean): number {
  delta = firstTime ? Math.floor(delta / DAMP) : delta >> 1;
  delta += Math.floor(delta / numPoints);
  let k = 0;
  while (delta > (((BASE - T_MIN) * T_MAX) >> 1)) {
    delta = Math.floor(delta / (BASE - T_MIN));
    k += BASE;
  }
  return k + Math.floor((BASE - T_MIN + 1) * delta / (delta + SKEW));
}

export function punycodeToUnicode(domain: string): string {
  const output: string[] = [];
  const chars = domain.split("");
  const lastDelim = domain.lastIndexOf(DELIMITER);
  let n = INITIAL_N;
  let bias = INITIAL_BIAS;
  let index = 0;

  let input: string[];
  if (lastDelim > 0) {
    output.push(...chars.slice(0, lastDelim));
    input = chars.slice(lastDelim + 1);
  } else {
    input = chars;
  }

  while (input.length > 0) {
    const oldi = index;
    let w = 1;

    for (let k = BASE; ; k += BASE) {
      const charCode = input.shift()!.charCodeAt(0);
      const digit = charCode - (charCode < 58 ? 22 : charCode < 91 ? 65 : 97);
      index += digit * w;

      const t = k <= bias ? T_MIN : k >= bias + T_MAX ? T_MAX : k - bias;
      if (digit < t) break;
      w *= BASE - t;
    }

    bias = adapt(index - oldi, output.length + 1, oldi === 0);
    n += Math.floor(index / (output.length + 1));
    index %= output.length + 1;
    output.splice(index++, 0, String.fromCharCode(n));
  }

  return output.join("");
}

export function decodePunycodeDomain(domain: string): string {
  const punycodePattern = /\bxn--/i;
  if (!punycodePattern.test(domain)) return domain;

  return domain
    .split(".")
    .map((part) =>
      part.startsWith("xn--") ? punycodeToUnicode(part.slice(4)) : part
    )
    .join(".");
}

export function isDomainIgnored(domain: string, ignoredDomains: string[]): boolean {
  return ignoredDomains.some(
    (ignored) =>
      ignored === domain ||
      (ignored.startsWith("*.") &&
        `.${domain}`.endsWith(ignored.replace("*", ""))) ||
      (ignored.endsWith(".*") &&
        `${domain}.`.startsWith(ignored.replace("*", ""))) ||
      (ignored.startsWith("*.") &&
        ignored.endsWith(".*") &&
        `.${domain}.`.includes(ignored.replace(/\*/g, "")))
  );
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunkSize))
    );
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}
