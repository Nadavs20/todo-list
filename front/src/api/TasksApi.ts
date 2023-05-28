import { tasksApi } from "./api";
import { Task } from "../Store/index";

export const getAllTasks = async () => {
  const response = await tasksApi.get<Task[]>(`/`);
  return response.data;
};

export const getTaskById = async (id: number) => {
  const response = await tasksApi.get<Task>(`/${id}`);
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await tasksApi.post<Task>(`/`, task);
  return response.data;
};

export const updateTask = async (task: Task) => {
  const response = await tasksApi.put<Task>(`/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await tasksApi.delete(`/${id}`);
};

const generalApi = {
  getAll: getAllTasks,
  getById: getTaskById,
  createTask: createTask,
  updateTask: updateTask,
  deleteTask: deleteTask,
};

export default generalApi;
