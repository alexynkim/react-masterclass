import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { Categories, todoCategory, todoSelector } from "../../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const Container = styled.div`
  max-width: 30vw;
  margin: 20px auto;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  background-color: ${(props) => props.theme.bgHovorColor};
  color: ${(props) => props.theme.textHoverColor};
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
`;

const Selet = styled.select`
  width: 30%;
`;

function TodoList() {
  const [todoCat, setTodoCat] = useRecoilState(todoCategory);
  const todoSel = useRecoilValue(todoSelector);

  const onChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setTodoCat(value as Categories);
  };

  return (
    <>
      <Container>
        <Title>To Do List</Title>
        <Selet onChange={onChangeHandler} value={todoCat}>
          <option value={Categories.ALL}>ALL</option>
          <option value={Categories.TO_DO}>TODO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </Selet>
        <CreateTodo />
        <ul>
          {/* {todoArr.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
          <hr /> */}
          {todoSel.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </ul>
      </Container>
    </>
  );
}

export default TodoList;
