export function createTradingViewChart() {
  const chartContainer = document.createElement('div');
  chartContainer.id = 'tv_chart';
  chartContainer.style.width = '100%';
  chartContainer.style.height = '400px';

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/tv.js';
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
  return chartContainer;
}
