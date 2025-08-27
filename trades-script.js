let currentMarketPrice = null;

function createInputRow() {
  const row = document.createElement("tr");
  row.id = "inputRow";
  row.innerHTML = `
    <td>
      <select id="position" onchange="fetchLivePrice()">
        <option>Long</option>
        <option>Short</option>
      </select>
    </td>
    <td><input id="entry" placeholder="Live-Preis wird geladen..." oninput="calculateLiq(); calculatePnL();"></td>
    <td><input id="leverage" placeholder="z.B. 20" oninput="calculateLiq(); calculatePnL();"></td>
    <td><input id="liq" placeholder="Wird berechnet..." readonly></td>
    <td><input id="pnl" placeholder="Wird berechnet..." readonly></td>
    <td><input id="balance" placeholder="z.B. 66400000.00 USDT"></td>
    <td><input id="collateral" placeholder="z.B. 3320000.00 USDT" oninput="calculatePnL()"></td>
    <td><input id="wallet" placeholder="z.B. 0x54D7"></td>
    <td><button onclick="saveTrade()">💾 Speichern</button></td>
  `;
  document.getElementById("tradesBody").appendChild(row);
}

async function fetchLivePrice() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");
    const data = await response.json();
    currentMarketPrice = parseFloat(data.price);
    document.getElementById("entry").value = currentMarketPrice.toFixed(2);
    calculateLiq();
    calculatePnL();
  } catch (error) {
    console.error("Fehler beim Laden des Live-Preises:", error);
    document.getElementById("entry").value = "Fehler";
  }
}

function calculateLiq() {
  const entry = parseFloat(document.getElementById("entry").value);
  const leverage = parseFloat(document.getElementById("leverage").value);
  const position = document.getElementById("position").value;

  if (!entry || !leverage || leverage <= 0) {
    document.getElementById("liq").value = "";
    return;
  }

  const liq = position === "Long"
    ? entry * (1 - 1 / leverage)
    : entry * (1 + 1 / leverage);

  document.getElementById("liq").value = liq.toFixed(2);
}

function calculatePnL() {
  const entry = parseFloat(document.getElementById("entry").value);
  const leverage = parseFloat(document.getElementById("leverage").value);
  const collateral = parseFloat(document.getElementById("collateral").value);
  const position = document.getElementById("position").value;

  if (!entry || !leverage || !collateral || !currentMarketPrice) {
    document.getElementById("pnl").value = "";
    return;
  }

  const diff = position === "Long"
    ? currentMarketPrice - entry
    : entry - currentMarketPrice;

  const pnl = diff * leverage * (collateral / entry);
  document.getElementById("pnl").value = pnl.toFixed(2) + " USDT";
}

async function saveTrade() {
  await fetchLivePrice();
  calculatePnL();

  const trade = {
    position: document.getElementById("position").value,
    entry: document.getElementById("entry").value,
    leverage: document.getElementById("leverage").value,
    liq: document.getElementById("liq").value,
    pnl: document.getElementById("pnl").value,
    balance: document.getElementById("balance").value,
    collateral: document.getElementById("collateral").value,
    wallet: document.getElementById("wallet").value
  };

  const trades = JSON.parse(localStorage.getItem("trades")) || [];
  trades.push(trade);
  localStorage.setItem("trades", JSON.stringify(trades));

  renderTrades();
}

function renderTrades() {
  const body = document.getElementById("tradesBody");
  body.innerHTML = "";
  createInputRow();

  const trades = JSON.parse(localStorage.getItem("trades")) || [];

  trades.forEach((trade, index) => {
    const row = document.createElement("tr");
    row.className = trade.position === "Long" ? "long" : "short";

    row.innerHTML = `
      <td>${trade.position}</td>
      <td>${trade.entry}</td>
      <td>${trade.leverage}</td>
      <td>${trade.liq}</td>
      <td>${trade.pnl}</td>
      <td>${trade.balance}</td>
      <td>${trade.collateral}</td>
      <td>${trade.wallet}</td>
      <td class="action-buttons">
        <button onclick="deleteTrade(${index})">🗑️ Löschen</button>
      </td>
    `;

    body.appendChild(row);
  });
}

function deleteTrade(index) {
  const trades = JSON.parse(localStorage.getItem("trades")) || [];
  trades.splice(index, 1);
  localStorage.setItem("trades", JSON.stringify(trades));
  renderTrades();
}

window.onload = renderTrades;
