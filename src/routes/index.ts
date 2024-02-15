import { Request, Response, Router } from "express";

export const helloRouter = Router();

const hello = async (req: Request, res: Response) => {
  res.send("Hello World!");
};

helloRouter.get("/", hello);
