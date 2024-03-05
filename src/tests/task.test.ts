import request from "supertest";
import { app } from "../index";
import { savedTasks } from "../services/task";
import { Task } from "../models/task";

describe("GET /tasks", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(null || undefined);
  });
  it("should return tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.body.length >= 1).toBe(true);
  });
});

describe("GET /tasks/id/:id", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/api/tasks/id/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(null || undefined);
  });
  it("should return the first entry of the array", async () => {
    const res = await request(app).get("/api/tasks/id/1");
    expect(res.body).toEqual([
      {
        id: 1,
        walletAddress: "0x0",
        description: "much description",
      },
    ]);
  });
});

describe("GET /tasks/wallet/:address", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/api/tasks/id/0x0");
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(null || undefined);
  });
  it("should return the first entry of the array", async () => {
    const res = await request(app).get("/api/tasks/wallet/0x0");
    expect(res.body).toEqual([
      {
        id: 1,
        walletAddress: "0x0",
        description: "much description",
      },
    ]);
  });
});

describe("CREATE /tasks/create", () => {
  const newTask = {
    id: savedTasks.length + 1,
    walletAddress: "0x01",
    description: "new task for testing purposes",
  };
  it("should return a 200 status", async () => {
    const res = await request(app).post("/api/tasks/create").send(newTask);
    expect(res.statusCode).toBe(200);
  });
  it("Should CREATE a new task", async () => {
    const res = await request(app).post("/api/tasks/create").send(newTask);
    const lastTask = res.body[res.body.length - 1];
    expect(lastTask).toEqual(newTask);
  });
});

describe("PATCH /tasks/update/:id", () => {
  const updatedTask = {
    id: 1,
    walletAddress: "0x01",
    description: "updated task for testing purposes",
  };
  it("should return a 200 status code", async () => {
    const res = await request(app)
      .patch("/api/tasks/update/1")
      .send(updatedTask);
    expect(res.statusCode).toBe(200);
  });
  it("should return the updated array", async () => {
    const res = await request(app)
      .patch("/api/tasks/update/1")
      .send(updatedTask);
    expect(res.body[0]).toStrictEqual(updatedTask);
  });
});

describe("DELETE by ID /tasks/delete/id/:id", () => {
  it("should return a 200 status code", async () => {
    const res = await request(app).delete("/api/tasks/delete/id/1");
    expect(res.statusCode).toBe(200);
  });
  it("should return the updated array", async () => {
    const res = await request(app).delete("/api/tasks/delete/id/1");
    const restOfTasks = res.body;
    const oldEntryExists = restOfTasks.findIndex((task: Task) => task.id === 1);
    expect(oldEntryExists).toBe(-1);
  });
});

describe("DELETE by wallet address /tasks/delete/wallet/:address", () => {
  it("should return a 200 status code", async () => {
    const res = await request(app).delete("/api/tasks/delete/wallet/0x01");
    expect(res.statusCode).toBe(200);
  });
  it("should return the updated array", async () => {
    const res = await request(app).delete("/api/tasks/delete/wallet/0x01");
    const restOfTasks = res.body;
    const oldEntryExists = restOfTasks.findIndex(
      (task: Task) => task.walletAddress === "0x01"
    );
    expect(oldEntryExists).toBe(-1);
  });
});
