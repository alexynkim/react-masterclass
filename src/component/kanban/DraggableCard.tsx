import React from "react";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { ITodo } from "./atomsForkanban";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  font-size: 50px;
  text-align: center;
`;

function DraggableCard({ todo, index }: { todo: ITodo; index: number }) {
  //console.log(`${todo} ===> Draggable card reRering`);
  return (
    <Draggable draggableId={todo.id + ""} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todo.text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
