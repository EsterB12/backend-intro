import { useLocalStorage } from "usehooks-ts";
import { Task } from "../models/task";

const savedTasks: Array<Task> = [
  { id: 1, walletAddress: "0x0", description: "much description" },
];

export const createTask = async (task: Task) => {
  try {
    if (task) {
      const newTasks = [...savedTasks, task];
      return newTasks;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteTaskById = async (id: number) => {
  try {
    if (id) {
      const newTasks = savedTasks.filter((task: Task) => task.id !== id);
      return newTasks;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteTasksByAddress = async (walletAddress: string) => {
  try {
    if (walletAddress) {
      const newTasks = savedTasks.filter(
        (task: Task) => task.walletAddress !== walletAddress
      );

      return newTasks;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateTaskById = async (id: number, taskData: Task) => {
  try {
    if (id) {
      const taskIndex = savedTasks.findIndex((task: Task) => task.id === id);
      const updatedEntry = savedTasks[taskIndex];
      savedTasks[taskIndex] = {
        id: taskIndex + 1,
        walletAddress: taskData.walletAddress ?? updatedEntry.walletAddress,
        description: taskData.description ?? updatedEntry.description,
      };

      return savedTasks;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getTaskByID = async (id: number) => {
  try {
    if (savedTasks) {
      const taskById = savedTasks.filter((task: Task) => task.id === id);
      return taskById;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getTasksByWallet = async (walletAddress: string) => {
  try {
    if (savedTasks) {
      const tasksByWallet = savedTasks.filter(
        (task: Task) => task.walletAddress === walletAddress
      );
      return tasksByWallet;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getAllTasks = async () => {
  try {
    if (savedTasks) {
      return savedTasks;
    }
  } catch (err) {
    console.error(err);
  }
};
