import { Request, Response, Router } from "express";
import { blogsRepository } from "../../repositories/blogs-repository";

export const blogsRouter = Router({});

blogsRouter.get("/", (req: Request, res: Response) => {
  const allBlogs = blogsRepository.findAllBlogs();
  res.send(allBlogs);
});
