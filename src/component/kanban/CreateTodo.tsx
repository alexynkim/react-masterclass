import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
//import { saveTodoItems } from "./Todo";
import { todoCategory, todoDataSet, ITodoSelect } from "./atomsForkanban";

const Form = styled.form`
  display: flex;
  //flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
`;

const Selet = styled.select`
  max-width: 180px;
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
  const [toDos, setToDos] = useRecoilState<ITodoSelect>(todoDataSet);
  const [todoCat, setTodoCat] = useRecoilState(todoCategory);

  const onChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setTodoCat(value);
  };

  const todoHandler = ({ todo }: IForm) => {
    setValue("todo", "");
    setToDos((prev: ITodoSelect) => {
      const newToDos = { ...prev };
      newToDos[todoCat] = [
        {
          text: todo,
          id: Date.now(),
          //category: todoCat,
        },
        ...prev[todoCat],
      ];
      //....saveTodoItems(newToDos);
      return newToDos;
    });
    setError("todo", {}, { shouldFocus: true });
  };

  // const categoryCounts = toDos.reduce((acc, todo) => {
  //   acc[todo.category] = (acc[todo.category] || 0) + 1;
  //   acc[Categories.ALL] += 1;
  //   return acc;
  // }, Object.fromEntries(categories.map((category) => [category, 0])) as Record<string, number>);

  return (
    <>
      <div>
        <label htmlFor="category">Category:</label>
        <Selet onChange={onChangeHandler} value={todoCat} id="category">
          {Object.keys(toDos).map((cat, i) => (
            <option key={cat} value={cat}>
              {cat}
              {/* ({categoryCounts[cat]}) */}
            </option>
          ))}
        </Selet>
      </div>
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
