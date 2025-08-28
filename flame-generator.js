function generateFlameSVG(pnl, size) {
  const width = 200;
  const height = 60;
  const centerY = height / 2;
  const amplitude = Math.min(Math.abs(pnl), 100) / 2 + size * 0.5;
  const color = pnl > 0 ? '#00ff99' : '#ff66cc';

  let path = `M 0 ${centerY}`;
  for (let x = 0; x <= width; x += 10) {
    const y = centerY - Math.sin(x * 0.1) * amplitude;
    path += ` L ${x} ${y.toFixed(2)}`;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" stroke="${color}" stroke-width="2" fill="none" />
    </svg>
  `;
}
