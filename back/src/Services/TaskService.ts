import { Task } from "../Models/Task";
import { getRepository } from "typeorm";

export const getAllTasks = async () => getRepository(Task).find();

export const getTaskById = async (id: number) => {
  try {
    return getRepository(Task).findOne({ where: { id } });
  } catch (err) {
    throw new Error(`Task with id ${id} was not found`);
  }
};

export const createTask = async (task: Task) => {
  try {
    return getRepository(Task).save(task);
  } catch (err) {
    throw new Error(`Could not create task`);
  }
};

export const updateTask = async (task: Task) => {
  try {
    const taskToUpdate = await getRepository(Task).findOne({
      where: { id: task.id },
    });

    if (taskToUpdate) {
      taskToUpdate.description = task.description;
      taskToUpdate.dueDate = task.dueDate;
      taskToUpdate.status = task.status;

      return await getRepository(Task).save(taskToUpdate);
    }

    return null;
  } catch (err) {
    throw new Error(`Task with id ${task.id} was not found`);
  }
};

export const deleteTask = async (id: number) => {
  try {
    await getRepository(Task).delete(id);
  } catch (err) {
    throw new Error(`Task with id ${id} does not exist`);
  }
};
