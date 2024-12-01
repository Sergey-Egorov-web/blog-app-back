import { blogsRepository } from "../repositories/blogs-db-repository";

import { Request, Response, Router } from "express";
import { postRepositories } from "../repositories/posts-db-repository";

export const testingRouter = Router({});

testingRouter.delete("/", async (req: Request, res: Response) => {
  await blogsRepository.deleteAllBlogs();
  postRepositories.deleteAllPosts();
  res.send(204);
});
