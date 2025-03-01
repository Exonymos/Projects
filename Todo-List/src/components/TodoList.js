import React from "react";
import TodoItem from "./TodoItem";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({ tasks, editTask, toggleComplete, deleteTask }) => {
  return (
    <Droppable droppableId="todoList">
      {(provided) => (
        <div
          className="space-y-2"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TodoItem
                    task={task}
                    editTask={editTask}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
