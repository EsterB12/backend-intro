import { Request, Response, Router } from "express";

const helloRouter = Router();

const hello = async (req: Request, res: Response) => {
  res.send("Hello World!");
};

helloRouter.get("/api/hello", hello);

export default helloRouter;
