document.addEventListener("DOMContentLoaded", async () => {
  const numberElement = document.getElementById("number");
  const fonts = document.getElementById('fonts');

  try {
    const MANIFEST_URL = "https://raw.githubusercontent.com/otoneko1102/font-manager/main/manifest.json";
    const response = await fetch(MANIFEST_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log("Fetched JSON:", json);

    if (json.web_accessible_resources) {
      const resources = json.web_accessible_resources.flatMap((entry) => entry.resources || []);
      
      let list = '';
      for (const resource of resources) {
        list += `<li>${resource.replace('fonts/', '').replace('.ttf', '')}</li>`
      }
      fonts.innerHTML = list;

      numberElement.textContent = resources.length;
    } else {
      throw new Error("Invalid JSON structure");
    }
  } catch (error) {
    numberElement.textContent = "Error";
    console.error("Fetch error:", error);
  }
});
