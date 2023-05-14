import { Request, Response, Router } from "express";
import { getCustomRepository } from "typeorm";
import { Task } from "../Models/Task";
import { TaskService } from "../Services/TaskService";

const requestStatuses = {
  success: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  serverError: 500,
};

const taskController = Router();
const taskService = getCustomRepository(TaskService);

// GET /tasks --> get all tasks
taskController.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks).status(requestStatuses.success);
  } catch (err) {
    res.status(requestStatuses.serverError).json({ message: err });
  }
});

// GET /tasks/:id --> get task by id
taskController.get("/:id", async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(parseInt(req.params.id));

    if (!task) {
      res.status(requestStatuses.notFound).json({ message: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (err) {
    res.status(requestStatuses.serverError).json({ message: err });
  }
});

// POST /tasks --> create a new task
taskController.post("/", async (req: Request, res: Response) => {
  try {
    const task = new Task();
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.status = req.body.status;
    const newTask = await taskService.createTask(task);

    res.status(requestStatuses.created).json(newTask);
  } catch (err) {
    res.status(requestStatuses.serverError).json({ message: err });
  }
});

// PUT /tasks/:id --> update task
taskController.put("/:id", async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(parseInt(req.params.id));

    if (!task) {
      res.status(requestStatuses.notFound).json({ message: "Task not found" });
    } else {
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      task.status = req.body.status;
      const updatedTask = await taskService.updateTask(task);
      res.json(updatedTask);
    }
  } catch (err) {
    res.status(requestStatuses.serverError).json({ message: err });
  }
});

// DELETE /tasks/:id --> delete task by id
taskController.delete("/:id", async (req: Request, res: Response) => {
  try {
    await taskService.deleteTask(parseInt(req.params.id));
  } catch (err) {
    res.status(requestStatuses.serverError).json({ message: err });
  }
});

export { taskController };
