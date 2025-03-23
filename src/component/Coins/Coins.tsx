import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCoins } from "../../apifetch";

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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
`;

const CoinsList = styled.ul`
  margin: 5px;
  max-width: 500px;
  min-width: 350px;
`;

const Coin = styled.li`
  margin: 5px;
  padding: 0px;
  border-radius: 20px;
  background-color: lightblue;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
      background-color: ${(props) => props.theme.bgHovorColor};
      border-radius: 20px;
      color: ${(props) => props.theme.textHoverColor};
      font-weight: bold;
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
`;

const LoadingText = styled.div`
  font-size: 25px;
  margin: 50px;
`;

function Coins() {
  const { data: coins, isLoading: isCoinLoading } = useQuery<ICoins[]>({
    queryKey: ["QAllCoins"],
    queryFn: fetchAllCoins,
  });

  return (
    <>
      <Container>
        <Header>
          <Title>Cryptocurrency</Title>
        </Header>
        {isCoinLoading ? (
          <LoadingText>Loading...</LoadingText>
        ) : (
          <CoinsList>
            {coins?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`${coin.id}`} state={`${coin.name}`}>
                  <Img
                    src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                    alt=""
                  ></Img>
                  {coin.name}
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;
