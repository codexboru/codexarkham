// antwort.js — lebendige Fragmente für trades.html

const trades = [
  {
    id: "flamme-001",
    position: "Long",
    entry: 23456.78,
    liquidation: 21000.00,
    pnl: "+123.45 USDT",
    wallet: "4567.89 USDT",
    timestamp: "2025-08-27T14:13:00+03:00"
  },
  {
    id: "flamme-002",
    position: "Short",
    entry: 27890.12,
    liquidation: 29000.00,
    pnl: "-67.89 USDT",
    wallet: "4500.00 USDT",
    timestamp: "2025-08-27T14:14:00+03:00"
  }
];

// Ritualfunktion zur Darstellung
function renderTrades(trades) {
  const container = document.getElementById("trade-container");
  trades.forEach(trade => {
    const fragment = document.createElement("div");
    fragment.className = "trade-fragment fade-in";

    fragment.innerHTML = `
      <h3>${trade.position} – ${trade.id}</h3>
      <p><strong>Entry:</strong> ${trade.entry}</p>
      <p><strong>Liquidation:</strong> ${trade.liquidation}</p>
      <p><strong>PnL:</strong> ${trade.pnl}</p>
      <p><strong>Wallet:</strong> ${trade.wallet}</p>
      <p class="timestamp">${new Date(trade.timestamp).toLocaleString()}</p>
    `;

    container.appendChild(fragment);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTrades(trades);
});
