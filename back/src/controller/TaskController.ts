import { Router } from "express";
import { Task } from "../Models/Task";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../Services/TaskService";

const reqStatus = {
  success: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  serverError: 500,
};

const taskController = Router();

// GET /tasks --> get all tasks
taskController.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();

    res.status(reqStatus.success).json(tasks);
  } catch (err) {
    res.status(reqStatus.serverError).json({ message: err });
  }
});

// GET /tasks/:id --> get task by id
taskController.get("/:id", async (req, res) => {
  try {
    const task = await getTaskById(parseInt(req.params.id));

    if (!task) {
      res.status(reqStatus.notFound).json({ message: "Task not found" });
    } else {
      res.status(reqStatus.success).json(task);
    }
  } catch (err) {
    res.status(reqStatus.serverError).json({ message: err });
  }
});

// POST /tasks --> create a new task
taskController.post("/", async (req, res) => {
  try {
    const task = new Task();
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.status = req.body.status;
    const newTask = await createTask(task);

    res.status(reqStatus.success).json(newTask);
  } catch (err) {
    res.status(reqStatus.serverError).json({ message: err });
  }
});

// PUT /tasks/:id --> update task
taskController.put("/:id", async (req, res) => {
  try {
    const task = await getTaskById(parseInt(req.params.id));

    if (!task) {
      res
        .status(reqStatus.notFound)
        .json({ message: `Task with id: ${req.params.id} not found` });
    } else {
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      task.status = req.body.status;
      const updatedTask = await updateTask(task);

      res.status(reqStatus.success).json(updatedTask);
    }
  } catch (err) {
    res.status(reqStatus.serverError).json({ message: err });
  }
});

// DELETE /tasks/:id --> delete task by id
taskController.delete("/:id", async (req, res) => {
  try {
    const result = await deleteTask(parseInt(req.params.id));

    let deleteStatus;
    let message;

    if (result) {
      deleteStatus = reqStatus.success;
      message = `Task: ${req.params.id} deleted successfully`;
    } else {
      deleteStatus = reqStatus.notFound;
      message = `Task: ${req.params.id} not found`;
    }

    res.status(deleteStatus).json({ message: message });
  } catch (err) {
    res.status(reqStatus.serverError).json({ message: err });
  }
});

export { taskController };
