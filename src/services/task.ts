import { Task, TaskInsert, tasks } from "../db/schema";
import { db, schema, eq } from "../db";

export const createTask = async (
  data: Pick<Task, "walletAddress" | "description">
) => {
  console.log(data);
  try {
    let [task] = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.walletAddress, data.walletAddress as string))
      .limit(1);

    if (!task) {
      [task] = await db.insert(schema.tasks).values(data).returning();

      if (!task) {
        throw new Error("Failed to create task");
      }
    }

    await db.insert(schema.tasks).values({
      id: task.id,
      walletAddress: data.walletAddress,
      description: data.description,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTaskById = async (id: Task["id"]) => {
  await db.delete(schema.tasks).where(eq(schema.tasks.id, id));

  return;
};

export const deleteTasksByAddress = async (
  walletAddress: Task["walletAddress"]
) => {
  await db
    .delete(schema.tasks)
    .where(eq(schema.tasks.walletAddress, walletAddress as string));

  return;
};

export const updateTaskById = async (
  id: Task["id"],
  taskData: Partial<TaskInsert>
) => {
  try {
    await db.update(schema.tasks).set(taskData).where(eq(schema.tasks.id, id));
    return getTaskByID(id);
  } catch (err) {
    console.error(err);
  }
};

export const getTaskByID = async (id: Task["id"]) => {
  try {
    if (!id) {
      return null;
    }
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task ?? null;
  } catch (err) {
    console.error(err);
  }
};

export const getTasksByWallet = async (
  walletAddress: Task["walletAddress"]
) => {
  try {
    if (!walletAddress) {
      return null;
    }
    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.walletAddress, walletAddress));

    return task ?? null;
  } catch (err) {
    console.error(err);
  }
};

export const getAllTasks = async () => {
  try {
    const tasks = await db.select().from(schema.tasks);
    return tasks;
  } catch (err) {
    console.error(err);
  }
};
