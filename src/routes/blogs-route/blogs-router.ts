import express, { NextFunction, Request, Response, Router } from "express";
import { blogsRepository } from "../../repositories/blogs-repository";

export const blogsRouter = Router({});

const ITINCUBATOR = (req: Request, res: Response, next: NextFunction): void => {
  console.log("IT-INCUBATOR");
  next();
};

blogsRouter.use(express.json());
blogsRouter.use(ITINCUBATOR);

blogsRouter.get("/", ITINCUBATOR, (req: Request, res: Response) => {
  const allBlogs = blogsRepository.findAllBlogs();
  // res.send(allBlogs);
  res.status(200).send(allBlogs);
});

blogsRouter.delete("/testing/all-data", (req: Request, res: Response) => {
  blogsRepository.deleteAllBlogs();
  res.send(204);
});

blogsRouter.post("/", (req: Request, res: Response) => {
  const newBlog = blogsRepository.addNewBlog(req.body);

  res.status(201).send(newBlog);
});
