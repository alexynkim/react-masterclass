import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ITodo, todoDataSet, categoryList } from "./atomsForTodo";

const ListContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
  border: 0.5px solid ${(props) => props.theme.borderShadow};
  background-color: ${(props) => props.theme.bgShadowColor};
  padding: 5px;
  border-radius: 10px;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const TodoItem = styled.p`
  padding: 3px 20px 3px 3px;
`;

const ButtonStyle = styled.button`
  font-size: 20px;
  border: none;
  background-color: transparent;
`;

export const saveTodoItems = (toDos: ITodo[]) => {
  //console.log("Save todo Items", toDos);
  localStorage.setItem("todos", JSON.stringify(toDos));
};

export const getTodoItems = (): ITodo[] => {
  const todos = localStorage.getItem("todos");
  //console.log("Get todo Items", todos);
  return todos ? JSON.parse(todos) : [];
};

function Todo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(todoDataSet);
  const categories = useRecoilValue(categoryList);

  const onChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setToDos((prevToDos) => {
      const newToDos = prevToDos.map((todo) =>
        todo.id === id ? { ...todo, category: value } : todo
      );
      saveTodoItems(newToDos);
      return newToDos;
    });
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { id },
    } = e;

    console.log("Type :", typeof id, " id: ", id);
    setToDos((prevToDos) => {
      const newToDos = prevToDos.filter((todo) => todo.id.toString() !== id);
      saveTodoItems(newToDos);
      return newToDos;
    });
  };

  return (
    <>
      <ListContainer>
        <TodoItem>{text}</TodoItem>
        <ButtonContainer>
          <select onChange={onChangeHandler} value={category}>
            {categories.map(
              (cat, ind) =>
                ind != 0 && (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                )
            )}
          </select>
          <ButtonStyle onClick={onClickHandler} id={id.toString()}>
            ❌
          </ButtonStyle>
        </ButtonContainer>
      </ListContainer>
    </>
  );
}

export default Todo;
