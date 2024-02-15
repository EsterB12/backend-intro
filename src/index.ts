import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { helloRouter } from "./routes";
import { tasksRouter } from "./routes/task";

dotenv.config();

export const app: Express = express();
app.use(express.json());
app.use("/api/hello", helloRouter);
app.use("/api/task", tasksRouter);
