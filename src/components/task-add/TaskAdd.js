import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';

const AddTaskContainer = styled.div`
  position: absolute;
  bottom: -86px;
  width: 100%;
`;

const AddTaskSpan = styled.div`
  background-color: transparent;
  padding: 8px;

  &:hover {
    background-color: #DFE1E5;
  }
`;

const FormContainer = styled.form`
  position: absolute;
  bottom: -96px;
  width: 100%;
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

  if (!editing) {
    return (
      <AddTaskContainer onClick={() => setEditing(true)}>
        <AddTaskSpan>Add a task</AddTaskSpan>
      </AddTaskContainer>
    );
  }

  return (
    <FormContainer onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Control type="text" placeholder="Please enter a task" size="sm" ref={input => textInput = input}/>
      </Form.Group>
      <Form.Group>
        <ButtonToolbar>
          <Button type="submit" variant="primary" size="sm">Add Task</Button>
          <Button className="ml-1" variant="danger" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </FormContainer>
  );
};

export default TaskAdd;