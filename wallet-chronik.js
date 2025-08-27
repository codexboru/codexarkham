export async function fetchChronik(wallet, apiKey) {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  const svgLines = data.result.slice(0, 20).map((tx, i) => {
    const height = Math.min(tx.value / 1e16, 200); // ETH scaled
    return `<line x1="${i * 20}" y1="200" x2="${i * 20}" y2="${200 - height}" stroke="#ff6600" stroke-width="2"/>`;
  }).join("");

  return `<svg width="400" height="200" style="background:#111">${svgLines}</svg>`;
}
