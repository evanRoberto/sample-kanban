import React, { useState } from 'react';
import styled from '@emotion/styled';

const AddTaskContainer = styled.div`
  background-color: transparent;
  padding: 8px;

  &:hover {
    background-color: #DFE1E5;
  }
`;

const TaskAdd = (props) => {
  const [editing, setEditing] = useState(false);
  let textInput = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskContent = textInput.value.trim();

    if (taskContent && props.onAdd) {
      props.onAdd(taskContent);
    }
    textInput.value = '';
  };

  if(!editing) {
    return (
      <div onClick={() => setEditing(true)}>
        <AddTaskContainer>Add a task</AddTaskContainer>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" ref={input => textInput = input} aria-label="Add a task" />
      <div>
        <button>Add Task</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskAdd;