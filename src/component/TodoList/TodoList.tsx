import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import TodoCategory from "./TodoCategory";
import { todoSelector, categoryMenuAtom } from "./atomsForTodo";

const Container = styled.div`
  max-width: 480px;
  margin: 20px auto;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  background-color: ${(props) => props.theme.bgTitleColor};
  color: ${(props) => props.theme.textTitleColor};
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  border-radius: 10px;
`;

function TodoList() {
  const todoSel = useRecoilValue(todoSelector);
  const setCategoryMenu = useSetRecoilState(categoryMenuAtom);

  const onClickContainer = () => {
    setCategoryMenu({
      showInput: false,
      showMgrPopup: false,
      showMoveToPopup: false,
    });
  };

  return (
    <>
      <Container onClick={onClickContainer}>
        <Title>To Do List</Title>
        <TodoCategory />
        <CreateTodo />
        <ul>
          {todoSel.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </ul>
      </Container>
    </>
  );
}

export default TodoList;
