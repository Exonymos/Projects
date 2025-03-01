import React, { useState } from "react";

const TodoItem = ({ task, editTask, toggleComplete, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded shadow transition">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => toggleComplete(task.id)}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-1 border border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
        ) : (
          <span
            className={`select-none ${
              task.isCompleted
                ? "line-through text-gray-500"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleEdit}
          className="p-1 rounded bg-blue-500 text-white"
        >
          <span className="material-icons">{isEditing ? "check" : "edit"}</span>
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 rounded bg-red-500 text-white"
        >
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
