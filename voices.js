function createVoiceEntry(data, containerId) {
  const flame = `<div class="flame" style="color:${data.pnl < 0 ? 'red' : 'lime'}">🔥</div>`;
  const div = document.createElement("div");
  div.className = "voice-entry";
  div.innerHTML = `
    <strong>${data.username}</strong><br>
    Entry: ${data.entry} | Leverage: ${data.leverage}x<br>
    Size: ${data.size} | Liq: ${data.liq}<br>
    PnL: ${data.pnl} | ROI: ${data.roi}%<br>
    Timestamp: ${data.time}<br>
    ${flame}
    <button onclick="this.parentElement.remove()">❌ Stimme löschen</button>
    <hr>
  `;
  document.getElementById(containerId).appendChild(div);
}

document.getElementById("binance-form").addEventListener("submit", function(e) {
  e.preventDefault();
  createVoiceEntry({
    username: binance-username.value,
    entry: binance-entry.value,
    leverage: binance-leverage.value,
    size: binance-size.value,
    liq: binance-liq.value,
    time: binance-time.value,
    pnl: binance-pnl.value,
    roi: binance-roi.value
  }, "binance-voices");
});

document.getElementById("hyperliquid-form").addEventListener("submit", function(e) {
  e.preventDefault();
  createVoiceEntry({
    username: hyperliquid-username.value,
    entry: hyperliquid-entry.value,
    leverage: hyperliquid-leverage.value,
    size: hyperliquid-size.value,
    liq: hyperliquid-liq.value,
    time: hyperliquid-time.value,
    pnl: hyperliquid-pnl.value,
    roi: hyperliquid-roi.value
  }, "hyperliquid-voices");
});
