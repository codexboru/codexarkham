async function fetchBinanceETHLeaderboard() {
  const response = await fetch("https://binance-leaderboard-api.vercel.app/api/leaderboard?symbol=ETHUSDT");
  const data = await response.json();

  const container = document.getElementById("binance-eth-leaderboard");
  container.innerHTML = "";

  data.traders.slice(0, 10).forEach((trader, index) => {
    const pnlColor = trader.pnl >= 0 ? "#00ff99" : "#ff3366";
    const entry = document.createElement("div");
    entry.className = "trader-entry";
    entry.innerHTML = `
      <div style="border-left: 4px solid ${pnlColor}; padding-left: 8px; margin-bottom: 12px;">
        <strong>#${index + 1} ${trader.name}</strong><br>
        📈 Entry: ${trader.entryPrice}<br>
        💰 PnL: <span style="color:${pnlColor}">${trader.pnl}</span><br>
        📦 Size: ${trader.positionSize}<br>
        🔥 Liquidation: ${trader.liquidationPrice || "—"}
      </div>
    `;
    container.appendChild(entry);
  });
}

fetchBinanceETHLeaderboard();
