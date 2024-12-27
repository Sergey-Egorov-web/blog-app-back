import { Request, Response, NextFunction } from "express";
import { postQueryRepository } from "../repositories/post-db-query-repository";

export const checkPostExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  //
  const post = await postQueryRepository.findPostById(postId);

  if (!post) {
    res.status(404).send("Post not found");
  } else {
    next();
  }
};
