"use client";

import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {

  const [ tasks, setTask ] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a Todo App", completed: false },
    { id: 3, title: "Deploy the App", completed: true }
  ])

  const [ newTask, setNewTask ] = useState("");

  const ToggleTask = (id: number) => {
    setTask(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ))
  }

  useEffect(() => {
    const saveTasks = localStorage.getItem('tasks');
    if (saveTasks) {
      setTask(JSON.parse(saveTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);  

  const addTask = () => {
    if (newTask.trim() != "") {
      setTask([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false
        }
      ])
    }
  }

  const editTask = (id: number, newTitle: string) => {
    setTask(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
  };

  const deleteTask = (id: number) => {
    setTask(tasks.filter(task => task.id !== id));
  };


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-gray-900 text-white p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <h2 className="text-3xl font-bold w-full text-center">📝 TODO LIST</h2>
        <div className="flex items-center w-full gap-2">
          <input
            type="text"
            value={newTask}
            placeholder="Enter your task here"
            className="flex-1 border border-white p-2 rounded bg-transparent text-white focus:outline-none"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="font-bold border border-white bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <TodoList tasks={tasks} ToggleTask={ToggleTask} editTask={editTask} deleteTask={deleteTask} />
      </main>
    </div>
  );

}
