import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
  $bgrColor: string;
  $borderColor?: string;
  $Text?: string;
}

interface ContainerProps {
  $bgrColor: string;
  $borderColor: string;
}

const FullWrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 10px;
  padding-top: 85px;
`;

const Container = styled.div<ContainerProps>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  background-color: ${(props) => props.$bgrColor};
  border-radius: 50px;
  margin: 5px;
  border: 1px dashed ${(props) => props.$borderColor};
`;

function Circle({ $bgrColor, $borderColor, $Text }: CircleProps) {
  const [counter, setCounter] = useState(0);

  const onClickHandler = () => {
    setCounter(counter + 1);
  };

  //console.log(`Rendering... Circle ${$Text || counter}`);
  return (
    <Container
      $bgrColor={$bgrColor}
      $borderColor={$borderColor ?? $bgrColor}
      onClick={$Text ? () => {} : onClickHandler}
    >
      {$Text || counter}
    </Container>
  );
}

function InputElement() {
  const [values, setValue] = useState("");
  const onChangeHendler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.value = "";
    console.log(values);
  };

  //  console.log(`Rendering... InputElement ${values}`);
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input onChange={onChangeHendler}></input>
      </form>
    </div>
  );
}

function TypeScriptExec() {
  return (
    <FullWrapper>
      <Wrapper>
        <Circle $borderColor="black" $bgrColor="tomato" />
        <Circle $Text="New" $bgrColor="teal" />
      </Wrapper>
      <Wrapper>
        <InputElement />
      </Wrapper>
    </FullWrapper>
  );
}

export default TypeScriptExec;
