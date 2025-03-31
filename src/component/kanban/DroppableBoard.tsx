import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";
import { useRecoilValue, useRecoilState } from "recoil";
import DraggableCard from "./DraggableCard";
import { ITodo } from "./atomsForkanban";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.movedColor};
  border-radius: 10px;
  min-height: 200px;
  flex-grow: 1;
`;

function DroppableBoard({
  boardId,
  toDoArray,
}: {
  boardId: string;
  toDoArray: ITodo[];
}) {
  // const [toDos, setToDos] = useRecoilState<ITodoSelect>(todoDataSet);
  // const todoCat = useRecoilValue(todoCategory);

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Board ref={magic.innerRef} {...magic.droppableProps}>
            {toDoArray.map((todo, i) => (
              <DraggableCard key={todo.id + ""} todo={todo} index={i} />
            ))}
            {magic.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableBoard;
