async function analyzeImageFromURL(imageUrl) {
  alert("🧠 Analyzing image...");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;
  await img.decode();

  const model = await nsfwjs.load();
  const predictions = await model.classify(img);
  const nsfwScore = predictions.find(p => ["Porn", "Sexy", "Hentai"].includes(p.className))?.probability || 0;

  if (nsfwScore > 0.6) {
    alert("❌ Image is NSFW or explicit.");
    return;
  }

  const { data: { text } } = await Tesseract.recognize(img, 'eng');
  const cleanedText = text.trim();

  if (!cleanedText) {
    alert("✅ Image is clean (no text found).");
    return;
  }

  const result = checkToxicText(cleanedText);
  if (result.toxic) {
    alert("❌ Offensive language detected:\n" + result.matches.join(", "));
  } else {
    alert("✅ Image is clean (no NSFW or toxic text).");
  }
}

analyzeImageFromURL(window.__ANALYZE_IMAGE_URL__);
