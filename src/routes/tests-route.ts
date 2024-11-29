import { blogsRepository } from "../repositories/blogs-db-repository";

import { Request, Response, Router } from "express";

export const testingRouter = Router({});

testingRouter.delete("/", async (req: Request, res: Response) => {
  await blogsRepository.deleteAllBlogs();
  res.send(204);
});
