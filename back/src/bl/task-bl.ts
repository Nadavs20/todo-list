import { Task } from "../entities/task";
import { getRepository } from "typeorm";

export const getAllTasks = () => getRepository(Task).find();

export const getTaskById = (id: number) => {
  return getRepository(Task).findOne({ where: { id } });
};

export const createTask = (task: Task) => {
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

  return !!result.affected;
};
