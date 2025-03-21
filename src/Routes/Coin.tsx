import { useLocation, useParams, useMatch, Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinPrice } from "./apifetch";
import { Routes, Route } from "react-router";

interface CoinParams {
  coinId: string;
  [key: string]: string | undefined;
}

const Container = styled.div`
  position: relative;
  padding: 20px;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
`;

const Header = styled.header`
  height: auto;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.bgHovorColor};
  color: ${(props) => props.theme.textHoverColor};
  padding: 10px 20px;
  border-radius: 10px;
  div:first-child {
    font-weight: bold;
  }
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 1.8;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isActive ? "darkcyan" : props.theme.bgHovorColor};
  border-radius: 10px;

  a {
    padding: 7px 0px;
    display: block;
    color: ${(props) =>
      props.isActive ? "white" : props.theme.textHoverColor};
    font-weight: ${(props) => (props.isActive ? 800 : 400)};
  }
`;

const BackBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 20px;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  border: none;
`;

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

function Coin() {
  const { coinId } = useParams<CoinParams>();
  const location = useLocation();
  const navigate = useNavigate();

  const priceMatch = useMatch(`/Coins/${coinId}/price`);
  const chartMatch = useMatch(`/Coins/${coinId}/chart`);

  const { data: coinInfo, isLoading: isInfoloading } = useQuery<IInfoData>({
    queryKey: ["QCoinInfo", coinId],
    queryFn: () => fetchCoinInfo(coinId!),
  });

  const { data: coinPrice, isLoading: isPriceloading } = useQuery<IPriceData>({
    queryKey: ["QCoinPrice", coinId],
    queryFn: () => fetchCoinPrice(coinId!),
  });

  const loading = isInfoloading || isPriceloading;

  const OnClickHandler = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackBtn onClick={() => navigate(-1)}>{`< BACK`}</BackBtn>
      <Header>
        <Title>
          <Img
            src={`https://static.coinpaprika.com/coin/${coinId}/logo.png`}
            alt=""
          ></Img>
          {location.state ?? coinInfo?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Price:</span>
              <span>${coinPrice?.quotes.USD.price}</span>
            </OverviewItem>
            <OverviewItem>
              <span>7D change:</span>
              <span>{coinPrice?.quotes.USD.percent_change_7d}%</span>
            </OverviewItem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{coinPrice?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{coinPrice?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
