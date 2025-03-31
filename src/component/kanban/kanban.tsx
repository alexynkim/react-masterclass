//..Import from the libraries
import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

//..Import from the internal app files
import { todoDataSet, ITodo, ITodoSelect } from "./atomsForkanban";
import DroppableBoard from "./DroppableBoard";
import CreateTodo from "./CreateTodo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

function Kanban() {
  const [toDos, setToDos] = useRecoilState<ITodoSelect>(todoDataSet);

  const onDragEndHandle = ({ destination, source }: DropResult) => {
    if (!destination || !source) return;
    console.log(source, destination);
    setToDos((prev) => {
      console.log("prev todo", prev);
      const newToDos = { ...prev };
      const toToDos = Array.isArray(newToDos[destination.droppableId])
        ? [...newToDos[destination.droppableId]]
        : [];

      const fromToDos = Array.isArray(newToDos[source.droppableId])
        ? destination.droppableId === source.droppableId
          ? toToDos
          : [...newToDos[source.droppableId]]
        : [];

      const [movedItem] = fromToDos.splice(source?.index, 1);
      toToDos.splice(destination.index, 0, movedItem);
      newToDos[source.droppableId] = fromToDos;
      newToDos[destination.droppableId] = toToDos;
      console.log("new todo", newToDos);
      return newToDos;
    });
  };

  console.log("reRendering...");
  return (
    <>
      <DragDropContext onDragEnd={onDragEndHandle}>
        <Wrapper>
          <CreateTodo />
          <Boards>
            {Object.keys(toDos).map((boardId) => {
              return (
                <DroppableBoard
                  boardId={boardId}
                  key={boardId}
                  toDoArray={toDos[boardId]}
                />
              );
            })}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default Kanban;
