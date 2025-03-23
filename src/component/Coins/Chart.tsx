import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../../apifetch";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "../../themeContext";
import { useThemeValue } from "../../themeRecoil";
import styled from "styled-components";
import { useState } from "react";

const Loader = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const Btn = styled.button`
  height: 20px;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.textColor};
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart() {
  const [isLine, setIsLine] = useState(false);
  //const { isDark } = useTheme();
  const theme = useThemeValue();
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, error, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    enabled: !!coinId,
  });

  const lineSeries = [
    {
      name: "Price",
      data: Array.isArray(data) ? data?.map((price) => price.close) : [],
    },
  ];

  const candleSeries = [
    {
      name: "Candlestick",
      data: Array.isArray(data)
        ? data?.map((price) => ({
            x: price.time_close, // 날짜 (X축)
            y: [price.open, price.high, price.low, price.close], // OHLC 데이터 (Y축)
          }))
        : [],
    },
  ];

  console.log(isLine, coinId, error?.message);
  console.log(lineSeries, candleSeries);
  return (
    <div>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : error ? (
        <Loader>Failed to load data...</Loader>
      ) : !Array.isArray(data) ? (
        <Loader>Ooops!! : Fail to loading</Loader>
      ) : (
        <>
          <Btn onClick={() => setIsLine(!isLine)}>
            {isLine ? "CANDLE" : "LINE"}
          </Btn>
          <ApexChart
            key={isLine ? "line" : "candlestick"} // 변경될 때마다 차트가 새로 생성됨
            type={isLine ? "line" : "candlestick"}
            series={isLine ? lineSeries : candleSeries}
            options={{
              theme: {
                //mode: isDark ? "dark" : "light",
                mode: theme.mode ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) =>
                    value > 1 ? `$${value.toFixed(2)}` : `$${value.toFixed(6)}`,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
