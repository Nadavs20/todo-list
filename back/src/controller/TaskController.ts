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

// export class TaskController {
//   public async getAllTasks(req, res): Promise<void> {
//     try {
//       const tasks = await taskService.getAllTasks();

//       res.status(reqStatus.success).send(tasks);
//     } catch (err) {
//       res
//         .status(reqStatus.serverError)
//         .send({ error: err, message: "Could not get all tasks" });
//     }
//   }

//   public async getTaskById(req, res): Promise<void> {
//     try {
//       const id = parseInt(req.params.id);
//       const tasks = await taskService.getTaskById(id);

//       res.status(reqStatus.success).send(tasks);
//     } catch (err) {
//       res
//         .status(reqStatus.serverError)
//         .send({ error: err, message: "Could not get all tasks" });
//     }
//   }

//   public async createTask(req, res): Promise<void> {
//     try {
//       const task = new Task();
//       task.description = req.body.description;
//       task.dueDate = req.body.dueDate;
//       task.status = req.body.status;
//       const newTask = await taskService.createTask(task);

//       res.status(reqStatus.created).send(newTask);
//     } catch (err) {
//       res.status(reqStatus.serverError).send({ message: err });
//     }
//   }

//   public async updateTask(req, res): Promise<void> {
//     try {
//       const task = await taskService.getTaskById(parseInt(req.params.id));

//       if (!task) {
//         res.status(reqStatus.notFound).send({ message: "Task not found" });
//       } else {
//         task.description = req.body.description;
//         task.dueDate = req.body.dueDate;
//         task.status = req.body.status;
//         const updatedTask = await taskService.updateTask(task);

//         res.send(updatedTask);
//       }
//     } catch (err) {
//       res.status(reqStatus.serverError).send({ message: err });
//     }
//   }

//   public async deleteTask(req, res): Promise<void> {
//     try {
//       await taskService.deleteTask(parseInt(req.params.id));
//     } catch (err) {
//       res.status(reqStatus.serverError).send({ message: err });
//     }
//   }
// }

// GET /tasks --> get all tasks
taskController.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();

    res.send(tasks).status(reqStatus.success);
  } catch (err) {
    res.status(reqStatus.serverError).send({ message: err });
  }
});

// GET /tasks/:id --> get task by id
taskController.get("/:id", async (req, res) => {
  try {
    const task = await getTaskById(parseInt(req.params.id));

    if (!task) {
      res.status(reqStatus.notFound).send({ message: "Task not found" });
    } else {
      res.send(task);
    }
  } catch (err) {
    res.status(reqStatus.serverError).send({ message: err });
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

    res.status(reqStatus.created).send(newTask);
  } catch (err) {
    res.status(reqStatus.serverError).send({ message: err });
  }
});

// PUT /tasks/:id --> update task
taskController.put("/:id", async (req, res) => {
  try {
    const task = await getTaskById(parseInt(req.params.id));

    if (!task) {
      res.status(reqStatus.notFound).send({ message: "Task not found" });
    } else {
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      task.status = req.body.status;
      const updatedTask = await updateTask(task);

      res.send(updatedTask);
    }
  } catch (err) {
    res.status(reqStatus.serverError).send({ message: err });
  }
});

// DELETE /tasks/:id --> delete task by id
taskController.delete("/:id", async (req, res) => {
  try {
    await deleteTask(parseInt(req.params.id));
  } catch (err) {
    res.status(reqStatus.serverError).send({ message: err });
  }
});

export { taskController };
