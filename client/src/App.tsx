import React, { useEffect, useState } from "react";
import { Task } from "./types.ts";
import * as api from "./api.ts";
import "./App.mod.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await api.fetchTask();
      setTasks(fetchedTasks);
    };

    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskName.trim()) {
      await api.addTask(newTaskName);
      setNewTaskName("");
      const updateTasks = await api.fetchTask();
      setTasks(updateTasks);
    }
  };

  const handleDeleteTask = async (id: number) => {
    await api.deleteTask(id);
    const updateTasks = await api.fetchTask();
    setTasks(updateTasks);
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    await api.updateTask(id, !completed);
    const updateTask = await api.fetchTask();
    setTasks(updateTask);
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="main">
        <h1 className="title">To-Do List</h1>
        <div className="input-field">
          <input
            className="input-txt"
            id="txt"
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter a new task"
          />
          <button className="input-btn" id="btn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        <div className="t-list">
          <ul className="tasks">
            {tasks.map((task) => (
              <li key={task.id} className="raw-list">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id, task.completed)}
                />
                <span>{task.name}</span>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
