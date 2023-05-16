import { tasksApi } from "./api";
import { TaskProps } from "../Store/index";

export async function getAllTasks(): Promise<TaskProps[]> {
  const response = await tasksApi.get<TaskProps[]>("/tasks");
  return response.data;
}

export async function getTaskById(id: number): Promise<TaskProps | undefined> {
  const response = await tasksApi.get<TaskProps>(`/tasks/${id}`);
  return response.data;
}

export async function createTask(task: TaskProps): Promise<TaskProps> {
  const response = await tasksApi.post<TaskProps>("/tasks", task);
  return response.data;
}

export async function updateTask(
  task: TaskProps
): Promise<TaskProps | undefined> {
  const response = await tasksApi.put<TaskProps>(`/tasks/${task.id}`, task);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await tasksApi.delete(`/tasks/${id}`);
}
