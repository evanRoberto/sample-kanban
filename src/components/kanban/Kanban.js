import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

import { CATEGORIES } from '../../constants'
import KanbanColumn from "../../components/kanban-column/KanbanColumn";

const Container = styled.div`
  background-color: #4C9AFF;
  min-height: 100vh;
  min-width: 100vw;
  display: inline-flex;
`;

let nextId = 2;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reorderQuoteMap = ({ taskMap, source, destination }) => {
  const current = [...taskMap[source.droppableId]];
  const next = [...taskMap[destination.droppableId]];
  const target = current[source.index];

  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);

    const result = {
      ...taskMap,
      [source.droppableId]: reordered,
    };

    return {
      taskMap: result,
    };
  }

  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);
  next[0]['status'] = destination.droppableId;

  const result = {
    ...taskMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    taskMap: result,
  };
};

const getByStatus = (tasks, status) => tasks.filter(task => task.status === status);

const Kanban = (props) => {
  const [tasks, setTasks] = useState([
    { id: 1, content: 'A feature requested from user to improve overall efficiency.', status: CATEGORIES.BACKLOG },
    { id: 2, content: 'Enhancement requested from product owner to improve overall design.', status: CATEGORIES.BACKLOG }
  ]);

  const [categories, setCategories] = useState(Object.values(CATEGORIES));

  const categoriesReducerFunc = (acc, val) => ({
    ...acc,
    [val]: getByStatus(tasks, val)
  });
  const categoriesReducer = categories.reduce(categoriesReducerFunc, {});

  const [columns, setColumns] = useState(categoriesReducer);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === 'COLUMN') {
      const ordered = reorder(
        categories,
        source.index,
        destination.index,
      );

      setCategories(ordered);

      return;
    }

    const data = reorderQuoteMap({
      taskMap: columns,
      source,
      destination,
    });

    setColumns(data.taskMap);
  };

  const addTask = (taskContent) => {
    const newTask = {
      id: ++nextId,
      content: taskContent,
      status: CATEGORIES.BACKLOG
    };

    setTasks((preTasks) => [...preTasks, newTask]);
  };

  useEffect(() => {
    setColumns(categoriesReducer);
  }, [tasks]);

  const board = (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {categories.map((key, index) => (
            <KanbanColumn
              key={key}
              index={index}
              title={key}
              tasks={columns[key]}
              onAdd={(taskContent) => addTask(taskContent)}
            />
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {board}
      </DragDropContext>
    </>
  );
};

export default Kanban;
