import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

//Styled components for general

const Container = styled.div`
  /* padding-top: 85px; */
  max-width: 600px;
  margin: 0 auto;
`;

//Styled components for Crypto main component

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

//Styled components for CryptoList

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 5px;
    width: 50px;
    text-align: left;
  }

  th {
    /* background-color: #f4f4f4; */
    font-weight: bold;
  }

  tr {
    /* &:nth-child(even) {
    background-color: #f9f9f9;
  } */
    &:hover {
      background-color: ${(props) => props.theme.bgHovorColor};
      color: ${(props) => props.theme.textHoverColor};
      transition: background-color 0.2s ease;
    }
  }
`;

interface CryptoListProps {
  coindata: Array<{
    id: string;
    name: string;
    quotes: {
      [key: string]: {
        price: number;
        market_cap: number;
        percent_change_7d: number;
      };
    };
  }>;
  currency: string;
}

function CryptoList({ coindata, currency }: CryptoListProps) {
  // console.log(coindata[0]);
  // console.log(`currency : ${currency}`);

  const unitCurrency: { [key: string]: string } = {
    USD: "$",
    CAD: "CAD $",
    KRW: "￦",
    EUR: "€",
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Change 7d</th>
          </tr>
        </thead>
        <tbody>
          {coindata.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>
                {unitCurrency[currency]} {coin.quotes[currency].price}
              </td>
              <td>
                {unitCurrency[currency]} {coin.quotes[currency].market_cap}
              </td>
              <td>{coin.quotes[currency].percent_change_7d}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function Crypto() {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const isSync = useRef(false);

  const getCoins = async () => {
    const url = "https://api.coinpaprika.com/v1/tickers";
    const opt = currency !== "USD" ? `?quotes=${currency}` : "";

    const json = await (await fetch(url + opt)).json();

    // console.log(json);
    console.log(json[0]);
    setCoins(json);
    isSync.current = true;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    isSync.current = false;
  };

  useEffect(() => {
    getCoins(); // eslint-disable-next-line
  }, [currency]);

  console.log(`Rending ... currency : ${currency}, isSync: ${isSync.current}`);
  return (
    <>
      <TitleWrapper>
        <Title>Cryptocurreny</Title>
        <Wrapper>
          <span>Currency</span>
          <select onChange={onChangeHandler} value={currency}>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="KRW">KRW</option>
            <option value="EUR">EUR</option>
          </select>
        </Wrapper>
      </TitleWrapper>

      {isSync.current ? (
        <CryptoList coindata={coins} currency={currency} />
      ) : (
        ""
      )}
    </>
  );
}

function PreCoins() {
  return (
    <Container>
      <Crypto />
    </Container>
  );
}

export default PreCoins;
