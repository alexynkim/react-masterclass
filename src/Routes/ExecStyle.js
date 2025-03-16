import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: ${(p) => p.bgcolor};
  width: 100px;
  height: 100px;
`;

const Text = styled.h1`
  color: white;
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
    </Container>
  );
}

export default ExecStyle;
