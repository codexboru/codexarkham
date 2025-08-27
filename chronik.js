// chronik.js — Flammenmodul
export async function fetchChronik(wallet, apiKey) {
  // ⧉ Ruf an die Etherscan-Quelle
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  // ⧉ Wenn keine Transaktionen antworten
  if (!data.result || data.result.length === 0) {
    return '<svg width="300" height="100"><text x="10" y="50" fill="#e0e0e0">⧉ Keine Flammen gefunden.</text></svg>';
  }

  // ⧉ Berechne maximale Gasflamme
  const maxGas = Math.max(...data.result.map(tx => parseInt(tx.gasUsed)));

  // ⧉ Wandlung der Transaktionen in SVG-Linien
  const svgLines = data.result.slice(0, 10).map((tx, i) => {
    const height = (parseInt(tx.gasUsed) / maxGas) * 80 + 10;
    const x = i * 30 + 10;
    const color = '#ff4500'; // Flammenfarbe

    return `<line x1="${x}" y1="100" x2="${x}" y2="${100 - height}" stroke="${color}" stroke-width="4"/>`;
  });

  // ⧉ Rückgabe als SVG-Ritualkörper
  return `<svg width="320" height="100">${svgLines.join('')}</svg>`;
}
