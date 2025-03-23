import { fetchCoinPriceToday, fetchCoinPrice } from "../../apifetch";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  color: white;
  background-color: darkcyan;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  gap: 10px;
`;

const OverviewItem = styled.div`
  //flex: 0 0 48%; /* 각 요소가 전체 너비의 48% 차지하도록 설정 (2개씩 배치) */
  //height: 60px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

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

interface PriceProps {
  coinId: string;
}

interface ITodayPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, error, data } = useQuery<ITodayPrice[]>({
    queryKey: ["today", coinId],
    queryFn: () => fetchCoinPriceToday(coinId),
    enabled: !!coinId,
  });

  const { data: coinPrice, isLoading: isPriceloading } = useQuery<IPriceData>({
    queryKey: ["QCoinPrice", coinId],
    queryFn: () => fetchCoinPrice(coinId!),
  });

  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <Overview>
            <OverviewItem>
              <span>OPEN</span>
              <span>${data ? data[0]?.open : "N/A"}</span>
            </OverviewItem>
            <OverviewItem>
              <span>HIGH</span>
              <span>${data ? data[0]?.high : "N/A"}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>CLOSE</span>
              <span>${data ? data[0]?.close : "N/A"}</span>
            </OverviewItem>
            <OverviewItem>
              <span>LOW</span>
              <span>${data ? data[0]?.low : "N/A"}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>All Time High</span>
              <span>${coinPrice?.quotes.USD.ath_price}</span>
            </OverviewItem>
            <OverviewItem>
              <span>All Time High Date</span>
              <span>{coinPrice?.quotes.USD.ath_date.slice(0, 10)}</span>
            </OverviewItem>
          </Overview>
        </Container>
      )}
    </>
  );
}

export default Price;
