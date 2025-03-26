import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { saveTodoItems } from "./Todo";
import { todoCategory, todoDataSet, Categories } from "./atomsForTodo";

const Form = styled.form`
  display: flex;
  //flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  width: 80vw;
  height: 50px;
`;

const ButtonStyle = styled.button`
  background-color: ${(props) => props.theme.bgShadowColor};
  border: 1px solid ${(props) => props.theme.borderShadow};
  color: ${(props) => props.theme.textColor};

  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.borderShadow};
    background-color: ${(props) => props.theme.bgTitleColor};
  }
`;

interface IForm {
  todo: string;
}

function CreateTodo() {
  const { register, handleSubmit, setValue, setError } = useForm<IForm>();
  const setToDos = useSetRecoilState(todoDataSet);
  const currCat = useRecoilValue<string>(todoCategory);

  const todoHandler = ({ todo }: IForm) => {
    setValue("todo", "");
    setToDos((prev) => {
      const newToDos = [
        {
          text: todo,
          id: Date.now(),
          category: currCat === Categories.ALL ? Categories.TO_DO : currCat,
        },
        ...prev,
      ];
      saveTodoItems(newToDos);
      return newToDos;
    });
    setError("todo", {}, { shouldFocus: true });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(todoHandler)}>
        <Input
          {...register("todo", {
            required: "Todo is required",
          })}
          placeholder="Input new todo"
        ></Input>
        <ButtonStyle>ADD</ButtonStyle>
      </Form>
    </>
  );
}

export default CreateTodo;
