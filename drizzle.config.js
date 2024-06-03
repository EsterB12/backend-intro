import { defineConfig } from "drizzle-kit";
import { DB_URL } from "../../src/config/variables";

export default defineConfig({
  url: DB_URL,
});
