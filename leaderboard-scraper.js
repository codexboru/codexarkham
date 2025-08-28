fetch('https://api.hyperliquid.xyz/info?type=leaderboard')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('hyperliquid-traders');
    let count = 0;

    data.traders.forEach(trader => {
      const ethPosition = trader.positions.find(p => p.coin === 'ETH');
      if (ethPosition && count < 20) {
        const div = document.createElement('div');
        div.className = 'trader-entry';

        const pnlColor = ethPosition.pnl > 0 ? '#00ff99' : '#ff66cc';
        const liqColor = '#ff4444';

        div.innerHTML = `
          <strong>${trader.name}</strong><br>
          Entry: ${ethPosition.entryPx}<br>
          <span style="color:${liqColor}">Liq: ${ethPosition.liqPx}</span><br>
          <span style="color:${pnlColor}">PnL: ${ethPosition.pnl.toFixed(2)}</span><br>
          Size: ${ethPosition.sz}<br>
          <hr>
        `;
        container.appendChild(div);
        count++;
      }
    });
  });
