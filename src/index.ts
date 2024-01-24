import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helloRouter from "./routes";

dotenv.config();

export const app: Express = express();

app.get("/api/hello", helloRouter);
