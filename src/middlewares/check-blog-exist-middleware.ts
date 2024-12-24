import { Request, Response, NextFunction } from "express";

import { blogsService } from "../domains/blogs-service";
import { blogsQueryRepository } from "../repositories/blog-db-query-repository";

export const checkBlogExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.blogId;
  // req.body.blogId;
  const blog = await blogsQueryRepository.findBlogById(blogId);

  if (!blog) {
    res.status(404).send("Blog not found");
  } else {
    next();
  }
};
