import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Shape = styled.div`
  display: flex;
  flex-direction: raw;
  margin: 20px;
`;

const Box = styled.div`
  background-color: ${(p) => p.$bgcolor};
  width: 100px;
  height: 100px;
  margin: 5px;
`;

const Circle = styled(Box)`
  border-radius: 40px;
`;

const Text = styled.h1`
  color: white;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  width: 50px;
  height: 50px;
  background-color: beige;
`;

function ExerciseStyle() {
  return (
    <Container>
      <Shape>
        <Box $bgcolor="blue">
          <Text>Hello</Text>
        </Box>
        <Box $bgcolor="tomato">
          <Text>Good</Text>
        </Box>
        <Circle $bgcolor="red">
          <Text>Morning</Text>
        </Circle>
      </Shape>
      <Shape>
        <Input></Input>
        <Input></Input>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Shape>
    </Container>
  );
}

export default ExerciseStyle;
