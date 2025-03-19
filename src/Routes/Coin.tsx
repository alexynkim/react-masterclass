import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 0px;
`;

interface CoinParams {
  coinId: string;
  [key: string]: string | undefined;
}

function Coin() {
  const { coinId } = useParams<CoinParams>();
  console.log(coinId);
  return (
    <Container>
      <h1>Coin {coinId}</h1>
    </Container>
  );
}

export default Coin;
