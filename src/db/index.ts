/* Packages */
import {
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../../src/config/variables";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schema";

export const connection = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
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
