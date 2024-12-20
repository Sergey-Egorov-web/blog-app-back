import { Request, Response, Router } from "express";
import { blogsService } from "../domains/blogs-service";
import { postService } from "../domains/posts-service";
import { usersService } from "../domains/users-services/users-service";
import { commentsService } from "../domains/comments-service";

export const testingRouter = Router({});

testingRouter.delete("/", async (req: Request, res: Response) => {
  await blogsService.deleteAllBlogs();
  await postService.deleteAllPosts();
  await usersService.deleteAllUsers();
  await commentsService.deleteAllComments();
  res.sendStatus(204);
});
