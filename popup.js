document.getElementById('analyzeBtn').addEventListener('click', async () => {
  const url = document.getElementById('imageUrl').value.trim();

  if (!url) {
    document.getElementById('result').textContent = "Please enter a valid image URL.";
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (url) => { window.__ANALYZE_IMAGE_URL__ = url; },
      args: [url]
    });

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["nsfw.min.js", "tesseract.min.js", "toxicityCheck.js", "analyzeImage.js"]
    });
  });
});
