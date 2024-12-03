import { Request, Response, NextFunction } from "express";

import { blogsService } from "../domains/blogs-service";

export const checkBlogExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.body.blogId;
  // req.body.blogId;
  const blog = blogsService.findBlog(blogId);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  next();
};
