import { migrate } from "drizzle-orm/node-postgres/migrator";
import { connection, db } from ".";

export async function runMigrations() {
  console.log("Migrating database...");

  (async () => {
    await migrate(db, { migrationsFolder: "./src/db/migrations" });

    await connection.end();
  })();
}
