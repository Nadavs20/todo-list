import { Task } from "../Models/Task";
import { getConnection, Repository } from "typeorm";

export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = getConnection().getRepository(Task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task | null> {
    try {
      return this.taskRepository.findOne({ where: { id: id } });
    } catch (err) {
      throw new Error(`Task with id ${id} was not found`);
    }
  }

  async createTask(task: Task): Promise<Task> {
    try {
        return this.taskRepository.save(task);
      } catch (err) {
        throw new Error(`Could not create task`);
      }
    
  }

  async updateTask(task: Task): Promise<Task | null> {
    try {
      const taskToUpdate = await this.taskRepository.findOne({
        where: { id: task.id },
      });

      if (taskToUpdate) {
        taskToUpdate.description = task.description;
        taskToUpdate.dueDate = task.dueDate;
        taskToUpdate.status = task.status;

        return await this.taskRepository.save(taskToUpdate);
      }

      return null;
    } catch (err) {
      throw new Error(`Task with id ${task.id} was not found`);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.taskRepository.delete(id);
    } catch (err) {
      throw new Error(`Task with id ${id} does not exist`);
    }
  }
}
