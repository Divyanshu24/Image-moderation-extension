chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyzeImage",
    title: "Analyze Image for Abuse (Free)",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (url) => { window.__ANALYZE_IMAGE_URL__ = url; },
    args: [info.srcUrl]
  }).then(() => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["nsfw.min.js", "tesseract.min.js", "toxicityCheck.js", "analyzeImage.js"]
    });
  });
});
