
document.getElementById('analyzeBtn').addEventListener('click', async () => {
  const url = document.getElementById('imageUrl').value.trim();
  const resultDiv = document.getElementById('result');

  if (!url) {
    resultDiv.textContent = "Please enter a valid image URL.";
    return;
  }

  resultDiv.textContent = "Analyzing image...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: analyzeImage,
      args: [url],
      files: ["nsfw.min.js", "tesseract.min.js", "toxicityCheck.js"]
    });
  });
});

async function analyzeImage(imageUrl) {
  alert("🧠 Analyzing image from popup...");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;
  await img.decode();

  const model = await nsfwjs.load();
  const predictions = await model.classify(img);
  const nsfwScore = predictions.find(p => ["Porn", "Sexy", "Hentai"].includes(p.className))?.probability || 0;

  if (nsfwScore > 0.6) {
    alert("❌ NSFW content detected!");
    return;
  }

  const { data: { text } } = await Tesseract.recognize(img, 'eng');
  const result = checkToxicText(text);

  if (result.toxic) {
    alert("❌ Offensive text found: " + result.matches.join(", "));
  } else {
    alert("✅ Image passed all checks.");
  }
}
