export function fetchAllCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((resp) =>
    resp.json()
  );
}
