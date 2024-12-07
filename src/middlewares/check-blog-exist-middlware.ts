import { Request, Response, NextFunction } from "express";

import { blogsService } from "../domains/blogs-service";
import { blogsQueryRepository } from "../repositories/blog-db-query-repository";

export const checkBlogExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.body.blogId;
  // req.body.blogId;
  const blog = blogsQueryRepository.findBlogById(blogId);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  next();
};
