import styled from "styled-components";
import bgImgdark from "./bgImgdark.jpg";
import bgImglight from "./bgImglight.jpg";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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

const ImageContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;

  padding: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center; /* 이미지 중앙 정렬 */
  align-items: center;
`;

const ProjectImg = styled.img`
  width: 20vw;
  height: auto;
  max-width: 100%;

  border-radius: 10px;
  border: 4px solid #ccc;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3),
    -4px -4px 10px rgba(255, 255, 255, 0.5);
`;

const LINK = styled(Link)`
  display: block;
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
      <ImageContainer>
        <LINK to="Coins">
          <ProjectImg src={require("./crypto.jpg")}></ProjectImg>
        </LINK>
      </ImageContainer>
      <Title>
        Welcome to
        <hr /> React Master Class
      </Title>
    </Container>
  );
}

export default Home;
