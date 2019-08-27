import React, { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

import { grid, borderRadius, categoryLabels } from '../../constants';
import Title from "../../components/title/Title";
import TaskList from "../../components/task-list/TaskList";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) => isDragging ? '#E3FCEF' : '#EBECF0'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #E3FCEF;
  }
`;

const KanbanColumn = ({ title, tasks, index, onAdd }) => {
  // console.log('KanbanColumn', tasks);

  // useEffect(() => {
  //   console.log('tasks changed', tasks);
  // });

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}>
              {categoryLabels[title]}
            </Title>
          </Header>
          <TaskList
            listId={title}
            listType="TASK"
            tasks={tasks}
            onAdd={onAdd}
            style={{ backgroundColor: snapshot.isDragging ? '#E3FCEF' : null }}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
