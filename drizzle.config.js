import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    host: "127.0.0.1",
    port: 3000,
    user: "postgres",
    password: "12345",
    database: "Tasks",
  },
});
