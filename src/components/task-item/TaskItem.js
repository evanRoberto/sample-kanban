import React from 'react';
import styled from '@emotion/styled';

import { grid, borderRadius } from '../../constants';

const getBackgroundColor = (isDragging) => {
  if (isDragging) return '#DEEBFF';

  return '#FFFFFF';
};

const getBorderColor = (isDragging) => isDragging ? '#2684FF' : 'transparent';

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging)};
  background-color: ${props => getBackgroundColor(props.isDragging)};
  box-shadow: ${({ isDragging }) => isDragging ? '2px 2px 1px #A5ADBA' : 'none'};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;

  color: #091E42;

  &:hover,
  &:active {
    color: #091E42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: #2684FF;
    box-shadow: none;
  }

  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
`;

const BlockTask = styled.div`
  &::before {
    content: open-task;
  }

  &::after {
    content: close-task;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const TaskId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;


function TaskItem(props) {
  const { task, isDragging, provided } = props;

  return (
    <Container
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}>
      <Content>
        <BlockTask>{task.content}</BlockTask>
        <Footer>
          <TaskId>id:{task.id}</TaskId>
        </Footer>
      </Content>
    </Container>
  );
}

export default React.memo(TaskItem);