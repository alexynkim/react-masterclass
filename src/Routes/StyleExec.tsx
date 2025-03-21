import styled, { keyframes } from "styled-components";
import { useTheme } from "../themecontext";
import bgImg from "./bgImgdark.jpg";

// #2.1 First Styled component

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  /* padding-top: 85px; */
  //background-color: ${(props) => props.theme.bgColor};
  //color: ${(props) => props.theme.textColor};
  background-image: url(${bgImg});
  background-size: cover; /* 이미지가 요소를 꽉 채우도록 설정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-position: center; /* 이미지 중앙 정렬 */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 20px;
`;

// #2.2 Adapting and Extending

interface BoxProps {
  $backColor: string;
}

const Box = styled.div<BoxProps>`
  background-color: ${(p) => p.$backColor};
  width: 100px;
  height: 100px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(Box)`
  border-radius: 40px;
`;

const Text = styled.h2`
  color: white;
`;

const ThemeContainer = styled.div`
  transform: translate(-20%, 0%);
`;

const ThemeText = styled.h1`
  font-size: 50px;

  &:hover {
    font-size: 80px;
  }
`;

// #2.3 'As' and "attributes"

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  width: 50px;
  height: 50px;
  background-color: beige;
  margin: 5px;
`;

// #2.4 Animations and Pseudo Selectors

const rotationAnim = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

// const slideInAnim = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   50% {
//     transform: translateX(100px);
//   }
//   100% {
//     transform: translateX(0);
//   }
// `;

const StyleBox = styled.div`
  height: 100px;
  width: 100px;
  color: white;
  background-color: darkcyan;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnim} 2s linear infinite;
  margin: 20px;
`;

const StyleBoxPolygon = styled(StyleBox)`
  background-color: darkmagenta;
  clip-path: polygon(
    25% 0%,
    75% 0%,
    100% 25%,
    100% 75%,
    75% 100%,
    25% 100%,
    0% 75%,
    0% 25%
  );
  span {
    font-size: 30px;
    &:hover {
      font-size: 60px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

// #2.5 Pseudo Selectors part Two\
const Emoji = styled.span`
  font-size: 30px;
`;

const StyleBoxTrepezoid = styled(StyleBox)`
  background-color: darkred;
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  ${Emoji}:hover {
    font-size: 60px;
    &:active {
      opacity: 0;
    }
  }
`;

// Main Exported rendering function

function StyleExec() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);
  return (
    <Container>
      <div>
        <Wrapper>
          <Box $backColor="blue">
            <Text>Hello</Text>
          </Box>
          <Box $backColor="tomato">
            <Text>Good</Text>
          </Box>
          <Circle $backColor="red">
            <Text>Morning</Text>
          </Circle>
        </Wrapper>

        <Wrapper>
          <Input></Input>
          <Input></Input>
          <Input></Input>
        </Wrapper>

        <Wrapper>
          <Btn>Log out</Btn>
          <Btn as="a" href="/">
            Go home
          </Btn>
        </Wrapper>

        <Wrapper>
          <StyleBox>
            <Text>😍</Text>
          </StyleBox>
          <StyleBoxPolygon>
            <Text as="span">🐶</Text>
          </StyleBoxPolygon>
          <StyleBoxTrepezoid>
            <Emoji as="p">👻</Emoji>
          </StyleBoxTrepezoid>
          <Emoji as="p">👻</Emoji>
        </Wrapper>
      </div>
      <ThemeContainer>
        <ThemeText>
          THEME <hr />
          CENTER
        </ThemeText>
        <Btn onClick={toggleTheme}>Theme Change</Btn>
      </ThemeContainer>
    </Container>
  );
}

export default StyleExec;
