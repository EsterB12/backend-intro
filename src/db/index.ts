/* Packages */
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schema";

export const connection = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "be-intro",
});

connection.connect();

export const db = drizzle(connection, { schema }) as NodePgDatabase<
  typeof schema
>;
export { schema };
export {
  eq,
  gt,
  gte,
  lt,
  lte,
  count,
  and,
  or,
  sql,
  inArray,
  desc,
  getTableColumns,
  SQLWrapper,
  ilike,
  like,
  isNull,
  isNotNull,
} from "drizzle-orm";

console.log("Connected to DB");
