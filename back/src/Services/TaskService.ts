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
    return await this.taskRepository.findOne({ where: { id: id } });
  }

  async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, task: Task): Promise<Task | null> {
    const taskToUpdate = await this.taskRepository.findOne({
      where: { id: id },
    });

    if (taskToUpdate) {
      taskToUpdate.description = task.description;
      taskToUpdate.dueDate = task.dueDate;
      taskToUpdate.status = task.status;

      return await this.taskRepository.save(taskToUpdate);
    }

    return null;
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
