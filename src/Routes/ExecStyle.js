import styled from "styled-components";

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const Box = styled.div`
  background-color: ${(p) => p.bgcolor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.h1`
  color: white;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  color: tomato;
`;

function ExecStyle() {
  return (
    <Container>
      <Box bgcolor="blue">
        <Text>Hello</Text>
      </Box>
      <Box bgcolor="tomato">
        <Text>Hello</Text>
      </Box>
      <Circle bgcolor="red">
        <Text>Hello</Text>
      </Circle>
      <Input></Input>
    </Container>
  );
}

export default ExecStyle;
