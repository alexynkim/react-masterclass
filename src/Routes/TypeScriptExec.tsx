import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
  $bgColor: string;
  $borderColor?: string;
  $Text?: string;
}

interface ContainerProps {
  $bgColor: string;
  $borderColor: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 10px;
`;

const Container = styled.div<ContainerProps>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  background-color: ${(props) => props.$bgColor};
  border-radius: 50px;
  margin: 5px;
  border: 1px dashed ${(props) => props.$borderColor};
`;

function Circle({ $bgColor, $borderColor, $Text }: CircleProps) {
  const [counter, setCounter] = useState(0);

  const onClickHandler = () => {
    setCounter(counter + 1);
  };

  console.log(`Rendering... Circle ${$Text || counter}`);
  return (
    <Container
      $bgColor={$bgColor}
      $borderColor={$borderColor ?? $bgColor}
      onClick={$Text ? () => {} : onClickHandler}
    >
      {$Text || counter}
    </Container>
  );
}

function InputElement() {
  const [values, setValue] = useState("");
  const onChangeHendler = (event: React.FormEvent<HTMLInputElement>) => {
    const copyEvent = Object.assign({}, event);
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
    console.log(copyEvent);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.value);
    event.currentTarget.value = "";
  };

  console.log(`Rendering... InputElement ${values}`);
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
    <div>
      <Wrapper>
        <Circle $borderColor="black" $bgColor="tomato" />
        <Circle $Text="New" $bgColor="teal" />
      </Wrapper>
      <Wrapper>
        <InputElement />
      </Wrapper>
    </div>
  );
}

export default TypeScriptExec;
