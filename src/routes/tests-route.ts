import { blogsRepository } from "../repositories/blogs-in-memory-repository";

import { Request, Response, Router } from "express";

export const testingRouter = Router({});

testingRouter.delete("/", (req: Request, res: Response) => {
  blogsRepository.deleteAllBlogs();
  res.send(204);
});
