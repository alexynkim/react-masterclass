import styled from "styled-components";
import bgImg from "./bgImg.jpg";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 115px;
  background-image: url(${bgImg});
  background-size: cover; /* 이미지가 요소를 꽉 채우도록 설정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center; /* 이미지 중앙 정렬 */
`;

const Title = styled.div`
  position: absolute;
  top: 30%;
  left: 10%;
  font-size: 50px;
  font-weight: bold;
  color: darkolivegreen;
`;
function Home() {
  return (
    <Container>
      <Title>
        Welcome <hr /> My Home
      </Title>
    </Container>
  );
}

export default Home;
