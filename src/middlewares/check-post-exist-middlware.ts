import { Request, Response, NextFunction } from "express";

import { blogsService } from "../domains/blogs-service";
import { blogsQueryRepository } from "../repositories/blog-db-query-repository";
import { postQueryRepository } from "../repositories/post-db-query-repository";

export const checkPostExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  console.log("checkPostExistsMiddleware hello", postId);
  const post = await postQueryRepository.findPostById(postId);

  if (!post) {
    res.status(404).send("Post not found");
  } else {
    next();
  }
};
