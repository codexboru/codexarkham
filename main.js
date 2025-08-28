// main.js
import { voices, saveVoice, renderVoice, updateLocalStorage } from './voices.js';
import { renderTableRow } from './table.js';
import { exportVoices, restoreVoices } from './export.js';

window.onload = function() {
  const stored = localStorage.getItem("voices");
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.forEach(v => {
      voices.push(v);
      renderVoice(v);
      renderTableRow(v);
    });
  }
};

window.saveVoiceHandler = function() {
  const direction = document.getElementById("direction").value;
  if (direction !== "LONG" && direction !== "SHORT") {
    alert("Nur LONG oder SHORT erlaubt.");
    return;
  }

  const data = {
    username: document.getElementById("username").value,
    entry: document.getElementById("entry").value,
    leverage: document.getElementById("leverage").value,
    size: document.getElementById("size").value,
    liq: document.getElementById("liq").value,
    pnl: document.getElementById("pnl").value,
    roi: document.getElementById("roi").value,
    direction: direction,
    time: new Date().toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  };

  saveVoice(data);
  renderVoice(data);
  renderTableRow(data);
};

window.exportVoicesHandler = exportVoices;
window.restoreVoicesHandler = restoreVoices;
