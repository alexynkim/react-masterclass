import styled from "styled-components";
import bgImgdark from "./bgImgdark.jpg";
import bgImglight from "./bgImglight.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-top: 115px; */
  background-image: ${(props) =>
    props.theme.mode ? `url(${bgImgdark})` : `url(${bgImglight})`};
  background-size: cover; /* 이미지가 요소를 꽉 채우도록 설정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center; /* 이미지 중앙 정렬 */
`;

const Title = styled.div`
  position: absolute;
  top: 60%;
  left: 10%;
  font-size: 50px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;
function Home() {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      navigate("Coins");
      sessionStorage.setItem("hasVisited", "true");
      console.log("Go to coins");
    } else {
      setInitialized(true);
      console.log(`setInitialized: ${initialized}`);
    }

    return () => {
      console.log("Home Unmounted!!!");
    };
  }, [navigate]);

  if (!initialized) {
    return null;
  }

  return (
    <Container>
      <Title>
        Welcome to
        <hr /> React Master Class
      </Title>
    </Container>
  );
}

export default Home;
