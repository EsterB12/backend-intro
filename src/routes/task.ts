import { Request, Response, Router } from "express";

export const tasksRouter = Router();

import {
  createTask,
  deleteTaskById,
  deleteTasksByAddress,
  updateTaskById,
  getTaskByID,
  getTasksByWallet,
  getAllTasks,
} from "../services/task";

export const create = async (req: Request, res: Response) => {
  try {
    const task = req.body;
    return res.json(await createTask(task));
  } catch {
    res.json({ error: "Error creating task" });
  }
};
export const updateTaskData = async (req: Request, res: Response) => {
  try {
    const task = req.body;
    return res.send(await updateTaskById(parseInt(req.params.id), task));
  } catch {
    res.json({ error: "Cannot update task data" });
  }
};

export const getByAddress = async (req: Request, res: Response) => {
  try {
    return res.send(await getTasksByWallet(req.params.walletAddress));
  } catch {
    res.json({ error: "Error fetching task" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    return res.send(await getTaskByID(parseInt(req.params.id)));
  } catch {
    res.json({ error: "Error fetching task" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    return res.send(await getAllTasks());
  } catch {
    res.json({ error: "Error fetching tasks" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    return res.send(await deleteTaskById(parseInt(req.params.id)));
  } catch {
    res.json({ error: "Unable to delete task" });
  }
};

export const deleteByAddress = async (req: Request, res: Response) => {
  try {
    return res.send(await deleteTasksByAddress(req.params.walletAddress));
  } catch {
    res.json({ error: "Unable to delete task" });
  }
};

tasksRouter.get("/wallet/:walletAddress", getByAddress);
tasksRouter.get("/id/:id", getById);
tasksRouter.get("/", getTasks);
tasksRouter.post("/create", create);
tasksRouter.patch("/update/:id", updateTaskData);
tasksRouter.delete("/delete/id/:id", deleteById);
tasksRouter.delete("/delete/wallet/:walletAddress", deleteByAddress);
