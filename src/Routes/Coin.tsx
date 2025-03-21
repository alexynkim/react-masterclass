import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinPrice } from "./apifetch";

interface CoinParams {
  coinId: string;
  [key: string]: string | undefined;
}

//========================================================
//Old styled components
//========================================================
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin: 50px 10px;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 30px;
//   display: flex;
//   align-items: center;
//   gap: 20px;
// `;

// const LoadingText = styled.div`
//   font-size: 25px;
//   margin: 50px;
// `;

// const Img = styled.img`
//   width: 80px;
//   height: 80px;
// `;

// const Infocontainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 500px;
// `;

// const InfoText = styled.p`
//   font-size: 15px;
//   text-align: left;
//   padding: 3px 15px 15px 15px;
// `;

// const FieldContainer = styled.ul`
//   margin: 5px;
// `;

// const Field = styled.li`
//   margin: 3px;
//   padding: 10px;
//   background-color: lightgoldenrodyellow;
//   display: flex;
//   align-items: center;
//   gap: 20px;
// `;

// const FieldTitle = styled.span`
//   font-size: 15px;
//   font-weight: bold;
//   margin: 10px 3px;
//   padding: 10px;
//   width: 150px;
//   text-align: left;
//   background-color: lightgray;
// `;
//========================================================
// Nomad Code coding...
//========================================================
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const LoadingText = styled.div`
  font-size: 25px;
  margin: 50px;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
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
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

//========================================================

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

  const { data: coinInfo, isLoading: isInfoloading } = useQuery<IInfoData>({
    queryKey: ["QCoinInfo", coinId],
    queryFn: () => fetchCoinInfo(coinId!),
  });

  const { data: coinPrice, isLoading: isPriceloading } = useQuery<IPriceData>({
    queryKey: ["QCoinPrice", coinId],
    queryFn: () => fetchCoinPrice(coinId!),
  });

  const loading = isInfoloading || isPriceloading;

  return (
    <Container>
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
              <span>Rank:</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{coinInfo?.open_source ? "Yes" : "No"}</span>
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

          {/* <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart />
            </Route>
          </Switch> */}
        </>
      )}
    </Container>
  );
}

export default Coin;
