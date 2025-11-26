"use client";

import { useState } from "react";
import { Task } from "../page";

type Props = {
  task: Task;
  ToggleTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
};

const TodoItem = ({ task, ToggleTask, editTask, deleteTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.title);

  const handleSave = () => {
    editTask(task.id, tempTitle.trim());
    setIsEditing(false);
  };

  return (
    <li className="w-full flex justify-between items-center bg-gray-800 rounded px-4 py-2 mb-2 shadow-md">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => ToggleTask(task.id)}
          className="h-4 w-4"
        />
        {isEditing ? (
          <input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="bg-gray-700 text-white p-1 rounded border border-white focus:outline-none"
          />
        ) : (
          <span className={`text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
