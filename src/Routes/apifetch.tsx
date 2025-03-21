export function fetchAllCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((resp) =>
    resp.json()
  );
}

// export function fetchCoinInfo(coinId: string) {
//   return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(
//     (resp) => resp.json
//   );
// }

export async function fetchCoinInfo(coinId: string) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}`
  );
  return response.json();
}

export async function fetchCoinPrice(coinId: string) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/tickers/${coinId}`
  );
  return response.json();
}
