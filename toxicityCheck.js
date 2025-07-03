
function checkToxicText(text) {
  const toxicWords = [
    "abuse", "hate", "kill", "idiot", "stupid", "dumb", "fool", "bastard",
    "bitch", "fuck", "shit", "moron", "slut", "racist"
  ];

  const lowerText = text.toLowerCase();
  const matches = toxicWords.filter(word => lowerText.includes(word));

  return {
    toxic: matches.length > 0,
    matches
  };
}
