import { Router } from "express";
import { Task } from "../entities/task";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../bl/task-bl";

import RequestStatus from "../utils/request-status";

const taskRouter = Router();

// GET /tasks --> get all tasks
taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();

    res.json(tasks);
  } catch (err) {
    res.status(RequestStatus.serverError).json({ message: err });
  }
});

// GET /tasks/:id --> get task by id
taskRouter.get("/:id", async (req, res) => {
  try {
    const task = await getTaskById(parseInt(req.params.id));

    if (!task) {
      res.status(RequestStatus.notFound).json({ message: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (err) {
    res.status(RequestStatus.serverError).json({ message: err });
  }
});

// POST /tasks --> create a new task
taskRouter.post("/", async (req, res) => {
  try {
    const task = new Task();
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.status = req.body.status;
    const newTask = await createTask(task);

    res.json(newTask);
  } catch (err) {
    res.status(RequestStatus.serverError).json({ message: err });
  }
});

// PUT /tasks/:id --> update task
taskRouter.put("/:id", async (req, res) => {
  try {
    const task = await getTaskById(parseInt(req.params.id));

    if (!task) {
      res
        .status(RequestStatus.notFound)
        .json({ message: `Task with id: ${req.params.id} not found` });
    } else {
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      task.status = req.body.status;
      const updatedTask = await updateTask(task);

      res.json(updatedTask);
    }
  } catch (err) {
    res.status(RequestStatus.serverError).json({ message: err });
  }
});

// DELETE /tasks/:id --> delete task by id
taskRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteTask(parseInt(req.params.id));

    let deleteStatus: RequestStatus;
    let message: string;

    if (result) {
      deleteStatus = RequestStatus.success;
      message = `Task: ${req.params.id} deleted successfully`;
    } else {
      deleteStatus = RequestStatus.notFound;
      message = `Task: ${req.params.id} not found`;
    }

    res.status(deleteStatus).json({ message: message });
  } catch (err) {
    res.status(RequestStatus.serverError).json({ message: err });
  }
});

export { taskRouter };
