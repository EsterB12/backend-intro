import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("Tasks", {
  id: serial("id").primaryKey(),
  wallet_address: varchar("wallet_address"),
  description: varchar("description"),
});

export type Task = typeof tasks.$inferSelect;

export type TaskInsert = typeof tasks.$inferInsert;
