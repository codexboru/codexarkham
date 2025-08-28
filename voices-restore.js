function restoreVoices() {
  const url = "https://raw.githubusercontent.com/dein-user/dein-repo/main/voices.json"; // ← anpassen
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("binance-voices").innerHTML = "";
      document.getElementById("hyperliquid-voices").innerHTML = "";
      data.forEach(entry => {
        const containerId = entry.source === "Binance" ? "binance-voices" : "hyperliquid-voices";
        createVoiceEntry({
          username: entry.username,
          entry: entry.entry,
          leverage: entry.leverage,
          size: entry.size,
          liq: entry.liq,
          time: new Date(entry.timestamp).toLocaleString(),
          pnl: entry.pnl,
          roi: entry.roi
        }, containerId);
      });
    })
    .catch(err => console.error("Fehler beim Wiederherstellen:", err));
}
