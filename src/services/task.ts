import { Task, TaskInsert, tasks } from "../db/schema";
import { db, schema, eq } from "../db";

export const createTask = async (
  data: Pick<Task, "wallet_address" | "description">
) => {
  console.log(data);
  try {
    let [task] = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.wallet_address, data.wallet_address as string))
      .limit(1);

    if (!task) {
      [task] = await db.insert(schema.tasks).values(data).returning();

      if (!task) {
        throw new Error("Failed to create task");
      }
    }

    await db.insert(schema.tasks).values({
      id: task.id,
      wallet_address: data.wallet_address,
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
  walletAddress: Task["wallet_address"]
) => {
  await db
    .delete(schema.tasks)
    .where(eq(schema.tasks.wallet_address, walletAddress as string));

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
  walletAddress: Task["wallet_address"]
) => {
  try {
    if (!walletAddress) {
      return null;
    }
    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.wallet_address, walletAddress));

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
