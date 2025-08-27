export async function fetchTokenResonanz(wallet, apiKey) {
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  const tokens = {};
  data.result.forEach(tx => {
    const symbol = tx.tokenSymbol;
    const value = parseFloat(tx.value) / Math.pow(10, tx.tokenDecimal);
    tokens[symbol] = (tokens[symbol] || 0) + value;
  });

  return Object.entries(tokens).map(([symbol, value]) => {
    return `🪙 ${symbol}: ${value.toFixed(4)}`;
  }).join("\n");
}
