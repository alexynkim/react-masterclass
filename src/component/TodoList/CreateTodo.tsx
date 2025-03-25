import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoCategory, todoDataSet, Categories } from "../../atoms";

const Form = styled.form`
  display: flex;
  //flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  width: 80vw;
  height: 50px;
`;

interface IForm {
  todo: string;
}

function CreateTodo() {
  const { register, handleSubmit, setValue, setError } = useForm<IForm>();
  const setTodoArr = useSetRecoilState(todoDataSet);
  const currCat = useRecoilValue<Categories>(todoCategory);

  const todoHandler = ({ todo }: IForm) => {
    setValue("todo", "");
    setTodoArr((prev) => [
      {
        text: todo,
        id: Date.now(),
        category: currCat === Categories.ALL ? Categories.TO_DO : currCat,
      },
      ...prev,
    ]);
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
        <button>ADD</button>
      </Form>
    </>
  );
}

export default CreateTodo;
