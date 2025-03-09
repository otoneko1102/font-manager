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

chrome.storage.local.get(["extensionEnabled", "ignoredDomains", "selectedFont"], (data) => {
  if (!data.extensionEnabled) return;

  const ignoredDomains = data.ignoredDomains || [];
  const selectedFont = data.selectedFont || "NotoSans.ttf";
  let currentDomain = window.location.hostname.replace(/^www\./, "");
  
  const punycodePattern = /\bxn--/i;
  if (punycodePattern.test(currentDomain)) {
    currentDomain = currentDomain
      .split('.')
      .map(part => (part.startsWith("xn--") ? punycodeToUnicode(part.slice(4)) : part))
      .join('.');
  }

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
