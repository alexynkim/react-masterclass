const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchAllCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  console.log(">>> Run fetchAllCoins");
  return response.json();
}

export async function fetchCoinInfo(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  console.log(">>> Run fetchCoinInfo");
  return response.json();
}

export async function fetchCoinPrice(coinId: string) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  console.log(">>> Run fetchCoinPrice");
  return response.json();
}

export async function fetchCoinHistory(coinId: string) {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  console.log(">>> Run fetchCoinHistory");
  return response.json();
}

export async function fetchCoinPriceToday(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`);
  console.log(">>> Run fetchCoinPrice Today");
  return response.json();
}
