import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

interface CoinParams {
  coinId: string;
  [key: string]: string | undefined;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LoadingText = styled.div`
  font-size: 25px;
  margin: 50px;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
`;

const Infocontainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

const InfoText = styled.p`
  font-size: 15px;
  text-align: left;
  padding: 3px 15px 15px 15px;
`;

const FieldContainer = styled.ul`
  margin: 5px;
`;

const Field = styled.li`
  margin: 3px;
  padding: 10px;
  background-color: lightgoldenrodyellow;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FieldTitle = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin: 10px 3px;
  padding: 10px;
  width: 150px;
  text-align: left;
  background-color: lightgray;
`;

interface CoinInfoProps {
  description: string;
  first_data_at: string;
  id: string;
  name: string;
  symbol: string;
}

interface TickerDataProps {
  quotes: {
    [key: string]: {
      price: number;
      market_cap: number;
      percent_change_7d: number;
    };
  };
}

interface CoinDataProps {
  info: CoinInfoProps;
  ticker: TickerDataProps;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

interface ICoinData {
  info: IInfoData;
  price: IPriceData;
}

function Coin() {
  const [coin, setCoin] = useState<ICoinData>();
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<CoinParams>();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      const Infos: IInfoData = infoData;
      const Prices: IPriceData = priceData;

      const coinData: ICoinData = { info: Infos, price: Prices };

      setCoin(coinData);
      setLoading(false);
    })();
  }, [coinId]);

  console.log(location.state);
  return (
    <Container>
      <Header>
        <Title>
          <Img
            src={`https://static.coinpaprika.com/coin/${coinId}/logo.png`}
            alt=""
          ></Img>
          {location.state ?? coin?.info.name}
        </Title>
      </Header>
      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <Infocontainer>
          <span> ✨ Description: </span>
          <InfoText>{coin?.info.description}</InfoText>
          <FieldContainer>
            <Field>
              <FieldTitle>▶️ Name:</FieldTitle>
              <InfoText>{coin?.info.name}</InfoText>
            </Field>
            <Field>
              <FieldTitle>▶️ First Date:</FieldTitle>
              <InfoText>{coin?.info.first_data_at}</InfoText>
            </Field>
            <Field>
              <FieldTitle>▶️ Symbol:</FieldTitle>
              <InfoText>{coin?.info.symbol}</InfoText>
            </Field>
            <Field>
              <FieldTitle>▶️ Price:</FieldTitle>
              <InfoText>${coin?.price.quotes.USD.price}</InfoText>
            </Field>
            <Field>
              <FieldTitle>▶️ Market cap:</FieldTitle>
              <InfoText>${coin?.price.quotes.USD.market_cap}</InfoText>
            </Field>
          </FieldContainer>
        </Infocontainer>
      )}
    </Container>
  );
}

export default Coin;
