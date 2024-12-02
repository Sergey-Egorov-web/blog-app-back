import { Request, Response, NextFunction } from "express";
import { blogsRepository } from "../repositories/blogs-db-repository";

export const checkBlogExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.body.blogId;
  // req.body.blogId;
  const blog = blogsRepository.findBlog(blogId);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  next();
};
