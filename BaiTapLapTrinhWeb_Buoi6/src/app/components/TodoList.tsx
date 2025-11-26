"use client";

import { Task } from "../page";
import TodoItem from "./TodoItem";

type Props = {
  tasks: Task[];
  ToggleTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
};

const TodoList = ({ tasks, ToggleTask, editTask, deleteTask }: Props) => {
  return (
    <ul className="w-full">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          ToggleTask={ToggleTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;
