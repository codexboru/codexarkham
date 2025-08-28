function createVoiceEntry(data, containerId) {
  if (!isValidVoice(data)) {
    alert("Bitte alle Felder ausfüllen.");
    return;
  }

  const flame = `<div class="flame" style="color:${data.pnl < 0 ? 'red' : 'lime'}">🔥</div>`;
  const div = document.createElement("div");
  div.className = "voice-entry";

  // 🜂 Admin-Stimme markieren
  if (data.username === "0xRoot") {
    div.setAttribute("data-admin", "true");
  }

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

// 🧬 Validierung der Stimme
function isValidVoice(data) {
  return data.username && data.entry && data.leverage && data.size && data.liq && data.time && data.pnl && data.roi;
}

// 🔐 Exportfunktion (nur für Admin-Stimmen)
function exportAdminVoices(containerId) {
  const entries = document.querySelectorAll(`#${containerId} .voice-entry[data-admin="true"]`);
  const data = Array.from(entries).map(entry => {
    return {
      username: entry.querySelector("strong").textContent,
      html: entry.innerHTML
    };
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${containerId}-admin-voices.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// 🜂 Filterfunktion: Nur Admin-Stimmen anzeigen
function toggleAdminVoices(containerId, showOnlyAdmin) {
  const entries = document.querySelectorAll(`#${containerId} .voice-entry`);
  entries.forEach(entry => {
    const isAdmin = entry.getAttribute("data-admin") === "true";
    entry.style.display = showOnlyAdmin && !isAdmin ? "none" : "block";
  });
}

// 🧿 Binance-Stimme einreichen
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

// 🧿 Hyperliquid-Stimme einreichen
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
