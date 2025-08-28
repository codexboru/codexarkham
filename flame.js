function getFlameSVG(roi, direction) {
  const color = direction === "LONG" ? "#00ff66" : "#ff0033";
  const flame = `
    <svg class="flame" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>
        .pulse {
          animation: pulse 1.2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
      <path class="pulse" fill="${color}" d="M12 2C10 6 6 8 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-5-4-7-6-11z"/>
    </svg>
  `;
  return flame;
}
