import { Categories, ITodo, todoDataSet } from "../../atoms";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
  border: 0.5px solid ${(props) => props.theme.borderShadow};
  background-color: ${(props) => props.theme.bgShadowColor};
  padding: 5px;
`;

function Todo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(todoDataSet);
  const onChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    console.log(value);

    setToDos((prevToDos) => {
      return prevToDos.map((todo) =>
        todo.id === id ? { ...todo, category: value as Categories } : todo
      );
    });
  };

  return (
    <>
      <ListContainer>
        <span>
          <li>{text}</li>
        </span>
        <select onChange={onChangeHandler} value={category}>
          <option value={Categories.TO_DO}>TODO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </select>
      </ListContainer>
    </>
  );
}

export default Todo;
