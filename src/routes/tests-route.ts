import { Request, Response, Router } from "express";
import { postRepositories } from "../repositories/posts-db-repository";
import { blogsService } from "../domains/blogs-service";

export const testingRouter = Router({});

testingRouter.delete("/", async (req: Request, res: Response) => {
  await blogsService.deleteAllBlogs();
  postRepositories.deleteAllPosts();
  res.send(204);
});
