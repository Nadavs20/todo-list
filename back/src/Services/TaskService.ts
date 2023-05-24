import { Task } from "../Models/Task";
import { getRepository } from "typeorm";

export const getAllTasks = async () => getRepository(Task).find();

export const getTaskById = async (id: number) => {
  return getRepository(Task).findOne({ where: { id } });
};

export const createTask = async (task: Task) => {
  return getRepository(Task).save(task);
};

export const updateTask = async (task: Task) => {
  const taskToUpdate = await getRepository(Task).findOne({
    where: { id: task.id },
  });

  if (taskToUpdate) {
    return getRepository(Task).save(task);
  }

  return null;
};

export const deleteTask = async (id: number) => {
  const result = await getRepository(Task).delete(id);

  return result.affected && result.affected > 0;
};
