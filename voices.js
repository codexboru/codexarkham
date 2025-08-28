// voices.js
export let voices = [];

export function saveVoice(data) {
  voices.push(data);
  updateLocalStorage();
}

export function renderVoice(data) {
  const box = document.createElement("div");
  box.className = `voice-box ${data.direction === "LONG" ? "long" : "short"}`;
  box.innerHTML = `
    <strong>${data.direction === "LONG" ? "🟢🜂" : "🔴🜂"} ${data.username}</strong><br>
    Entry: ${data.entry} | Leverage: ${data.leverage}x | Size: ${data.size}<br>
    Liq: ${data.liq} | PnL: ${data.pnl} | ROI: ${data.roi}%<br>
    Richtung: ${data.direction}<br>
    <small>${data.time}</small>
  `;
  document.getElementById("voiceContainer").appendChild(box);
}

export function updateLocalStorage() {
  localStorage.setItem("voices", JSON.stringify(voices));
}

export function deleteVoice(id) {
  let voices = JSON.parse(localStorage.getItem('voices')) || [];
  voices = voices.filter(v => v.id !== id);
  localStorage.setItem('voices', JSON.stringify(voices));
}
