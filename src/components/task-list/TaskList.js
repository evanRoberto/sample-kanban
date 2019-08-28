import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

import Title from '../../components/title/Title';
import TaskItem from '../../components/task-item/TaskItem';
import TaskAdd from '../../components/task-add/TaskAdd';
import { grid, CATEGORIES } from '../../constants';

const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) return '#FFEBE5';

  if (isDraggingFrom) return '#E6FCFF';

  return '#EBECF0';
};

const Wrapper = styled.div`
  background-color: ${props => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight = 300;

const DropZone = styled.div`
  position: relative;
  min-height: ${scrollContainerHeight}px;
  padding-bottom: ${grid}px;
  margin-bottom: 96px;
`;

const InnerTaskList = React.memo((props) => {
  return props.tasks.map((task, index) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <TaskItem
          key={task.id}
          task={task}
          isDragging={dragSnapshot.isDragging}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

const InnerList = (props) => {
  const { tasks, dropProvided } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerTaskList tasks={tasks} />
        {dropProvided.placeholder}
        {props.listId === CATEGORIES.BACKLOG &&
          <TaskAdd tasks={props.tasks} onAdd={props.onAdd}/>
        }
      </DropZone>
    </>
  );
};

const TaskList = ({ listId, listType, tasks, style, onAdd }) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}>
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}>
          <InnerList
            listId={listId}
            tasks={tasks}
            dropProvided={dropProvided}
            onAdd={onAdd}
          />
        </Wrapper>
      )}
    </Droppable>
  );
};

export default TaskList;