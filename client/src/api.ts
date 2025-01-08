import axios from "axios";
import { Task } from "./types.ts";

const API_BASE = "http://localhost:8000";

// fetch
export const fetchTask = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE}/tasks`);
  return response.data;
};

// add
export const addTask = async (name: string): Promise<void> => {
  await axios.post(`${API_BASE}/tasks`, { name });
};

// delete
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/tasks/${id}`);
};

// update
export const updateTask = async (
  id: number,
  completed: boolean,
): Promise<void> => {
  await axios.put(`${API_BASE}/tasks/${id}`, { completed });
};
