import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import Col from 'react-bootstrap/Col';

import { grid, borderRadius, categoryLabels } from '../../constants';
import Title from '../../components/title/Title';
import TaskList from '../../components/task-list/TaskList';

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
  width: 300px;

  &:hover {
    background-color: #E3FCEF;
  }
`;

const KanbanColumn = ({ title, tasks, index, onAdd }) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Col>
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title isDragging={snapshot.isDragging}
                     {...provided.dragHandleProps}>
                {categoryLabels[title]}
              </Title>
            </Header>
            <TaskList
              listId={title}
              listType='TASK'
              tasks={tasks}
              onAdd={onAdd}
              style={{ backgroundColor: snapshot.isDragging ? '#E3FCEF' : null }}
            />
          </Container>
        </Col>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
