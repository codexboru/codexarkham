// tokenresonanz.js — Resonanzmodul
export async function fetchTokenResonanz(wallet, apiKey) {
  // ⧉ Ruf an die Etherscan-Quelle
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${wallet}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  // ⧉ Erzeuge den Resonanzkörper
  const pre = document.createElement('pre');

  // ⧉ Wenn keine Stimme antwortet
  if (!data.result || data.result.length === 0) {
    pre.textContent = '⧉ Keine Tokenstimme gefunden.';
    return pre;
  }

  // ⧉ Wandlung der Transaktionen in poetische Zeilen
  pre.textContent = data.result
    .slice(0, 5) // Begrenze auf 5 Stimmen
    .map(tx => {
      const symbol = tx.tokenSymbol || '⧉';
      const value = parseFloat(tx.value) / Math.pow(10, tx.tokenDecimal || 18);
      const timestamp = new Date(tx.timeStamp * 1000).toLocaleString('de-DE');
      return `🪙 ${symbol}: ${value.toFixed(4)} — ${timestamp}`;
    })
    .join('\n');

  return pre;
}
