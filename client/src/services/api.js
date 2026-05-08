import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getUserProfile = () => API.get("/auth/profile");

export const getTasks = (params) => API.get("/tasks", { params });
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const getTaskSummary = () => API.get("/tasks/summary");
