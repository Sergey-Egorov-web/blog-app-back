import { Request, Response, NextFunction } from "express";
import { commentQueryRepository } from "../../repositories/comment-db-query-repository";

export const checkCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.id;
  // console.log("checkPostExistsMiddleware hello", postId);
  const comment = await commentQueryRepository.findCommentById(commentId);

  if (!comment) {
    res.status(404).send("Post not found");
  } else {
    next();
  }
};
