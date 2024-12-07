import { Request, Response, Router } from "express";
import { postRepository } from "../repositories/posts-db-repository";
import { blogsService } from "../domains/blogs-service";
import { postService } from "../domains/posts-service";

export const testingRouter = Router({});

testingRouter.delete("/", async (req: Request, res: Response) => {
  await blogsService.deleteAllBlogs();
  postService.deleteAllPosts();
  res.send(204);
});
