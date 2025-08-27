document.addEventListener("DOMContentLoaded", () => {
  const walletSection = document.getElementById("wallet-section");
  walletSection.style.opacity = 0;
  setTimeout(() => {
    walletSection.style.transition = "opacity 2s ease-in-out";
    walletSection.style.opacity = 1;
  }, 500);

  // TradingView Chart (ETH/USD)
  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/tv.js";
  script.onload = () => {
    new TradingView.widget({
      width: "100%",
      height: 400,
      symbol: "COINBASE:ETHUSD",
      interval: "D",
      theme: "dark",
      style: "1",
      locale: "en",
      container_id: "tv_chart"
    });
  };
  document.body.appendChild(script);
});
