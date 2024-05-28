import {
  createTask,
  getTaskByID,
  getAllTasks,
  getTasksByWallet,
  updateTaskById,
  deleteTaskById,
  deleteTasksByAddress,
} from "../services/task";
import * as schema from "../db/schema";
import { db } from "../db";

type Task = typeof schema.tasks.$inferSelect;
type TaskInsert = typeof schema.tasks.$inferInsert;

describe("User Service", () => {
  beforeAll(async () => {});

  afterAll(async () => {
    await db.delete(schema.tasks);
  });

  describe("createTask", () => {
    it("should create a task", async () => {
      const taskData = {
        id: 5,
        wallet_address: "0x123",
        description: "why hello there",
      };
      await createTask(taskData);
    });
  });

  describe("getAllTasks", () => {
    it("should get all tasks", async () => {
      const allTasks = await getAllTasks();
      expect(allTasks).toBeTruthy();
      expect(allTasks?.length).toBeGreaterThan(0);
    });
  });

  describe("getTaskById", () => {
    it("should get a task by id", async () => {
      const taskId = 5;
      const task = await getTaskByID(taskId);
      expect(task).toBeTruthy();
      expect(task?.id).toBe(taskId);
    });
  });

  describe("getTaskByWallet", () => {
    it("should get tasks by wallet", async () => {
      const walletAddress = "0x123";
      const tasks = await getTasksByWallet(walletAddress);
      expect(tasks).toBeTruthy();
    });
  });

  describe("updateTask", () => {
    it("should update a task", async () => {
      const taskId = 5;
      const data: Partial<TaskInsert> = {
        description: "I have been updated!",
      };
      await updateTaskById(taskId, data);
      const updatedTask = await getTaskByID(taskId);
      expect(updatedTask).toBeTruthy();
      expect(updatedTask?.description).toBe(data.description);
    });
  });

  describe("deleteTaskById", () => {
    it("should delete a task by ID", async () => {
      const taskId = 4;
      await deleteTaskById(taskId);
      const userAfterDeletion = await getTaskByID(taskId);
      expect(userAfterDeletion).toBeNull();
    });
  });

  describe("deleteTasksByWallet", () => {
    it("should delete tasks by wallet address", async () => {
      const walletAddress = "0x123";
      await deleteTasksByAddress(walletAddress);
      const userAfterDeletion = await getTasksByWallet(walletAddress);
      expect(userAfterDeletion).toBeNull();
    });
  });
});
