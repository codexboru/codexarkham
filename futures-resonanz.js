const apiKey = 'xHeaUN17PcZA70BIgoIzcVsNg8ujhANmHUPzoMZMQGZn9is3LX57DsxSC24aM5Mv';
const secretKey = 'DEIN_SECRET_KEY'; // falls du signierte Anfragen brauchst

fetch('https://fapi.binance.com/fapi/v2/account', {
  method: 'GET',
  headers: {
    'X-MBX-APIKEY': apiKey
  }
})
.then(res => res.json())
.then(data => {
  const positions = data.positions.filter(p => parseFloat(p.positionAmt) !== 0);
  // Visualisiere jede Position als Fragment im Codex
});
