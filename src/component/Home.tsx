import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import cryptoImg from "../images/crypto.jpg";
import todo from "../images/todo.jpg";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url(${(props) => props.theme.backgroundImage});
  background-size: cover; /* 이미지가 요소를 꽉 채우도록 설정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center; /* 이미지 중앙 정렬 */
`;

const ProjectContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  display: inline-flex;
`;

const ImageContainer = styled.div`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);

  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const ProjectImg = styled.img`
  width: 20vw;
  height: auto;
  max-width: 100%;

  border-radius: 10px;
  border: 4px solid #ccc;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3),
    -4px -4px 10px rgba(255, 255, 255, 0.5);

  &:hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 1),
      -4px -4px 10px rgba(255, 255, 255, 0.2);
  }
`;

const TooltipText = styled.span`
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ImageContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
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
  // <---------------------------------------------------------------------------------------------
  // //This is for re-routing to specific project folder because of SPA polich of GitHub publisher
  // //Solved with Hashrouter so it does not need anymore.
  // --------------------------------------------------------------------------------------------->
  // const navigate = useNavigate();
  // const [initialized, setInitialized] = useState(false);

  // useEffect(() => {
  //   const hasVisited = sessionStorage.getItem("hasVisited");

  //   if (!hasVisited) {
  //     navigate("TodoList");
  //     sessionStorage.setItem("hasVisited", "true");
  //     console.log("Go to coins");
  //   } else {
  //     setInitialized(true);
  //     console.log(`setInitialized: ${initialized}`);
  //   }

  //   return () => {
  //     console.log("Home Unmounted!!!");
  //   };
  // }, [navigate]);

  // if (!initialized) {
  //   return null;
  // }
  // <---------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------->

  return (
    <Container>
      <ProjectContainer>
        <ImageContainer>
          <LINK to="Coins">
            <ProjectImg src={cryptoImg}></ProjectImg>
          </LINK>
          <TooltipText>Crypto Tracker</TooltipText>
        </ImageContainer>
        <ImageContainer>
          <LINK to="TodoList">
            <ProjectImg src={todo}></ProjectImg>
          </LINK>
          <TooltipText>Todo List</TooltipText>
        </ImageContainer>
      </ProjectContainer>
      <Title>
        Welcome to
        <hr /> React Master Class
      </Title>
    </Container>
  );
}

export default Home;
