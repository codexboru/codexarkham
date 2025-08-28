function exportVoices() {
  const voices = [];

  document.querySelectorAll(".voice-entry").forEach(div => {
    const lines = div.innerText.split("\n");
    const usernameSource = lines[0].match(/^(.*)\s\((.*)\)$/);
    const entry = parseFloat(lines[1].match(/Entry:\s([\d.]+)/)[1]);
    const leverage = parseFloat(lines[1].match(/Leverage:\s([\d.]+)x/)[1]);
    const size = parseFloat(lines[2].match(/Size:\s([\d.]+)/)[1]);
    const liq = parseFloat(lines[2].match(/Liq:\s([\d.]+)/)[1]);
    const pnl = parseFloat(lines[3].match(/PnL:\s(-?[\d.]+)/)[1]);
    const roi = parseFloat(lines[3].match(/ROI:\s(-?[\d.]+)%/)[1]);
    const timestamp = new Date(lines[4]).toISOString();

    voices.push({
      source: usernameSource[2],
      username: usernameSource[1],
      entry,
      leverage,
      size,
      liq,
      timestamp,
      pnl,
      roi
    });
  });

  const blob = new Blob([JSON.stringify(voices, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "voices-export.json";
  a.click();
  URL.revokeObjectURL(url);
      }
