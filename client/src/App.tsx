import React, { useEffect, useState } from "react";
import { Task } from "./types.ts";
import * as api from "./api.ts";

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
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id, task.completed)}
              />
              {task.name}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
