import { Request, Response, NextFunction } from "express";
import { commentQueryRepository } from "../../repositories/comment-db-query-repository";

export const checkCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.id;
  console.log("checkCommentExistsMiddleware1", commentId);
  const comment = await commentQueryRepository.findCommentById(commentId);
  console.log("checkCommentExistsMiddleware2", comment);
  if (!comment) {
    res.status(404).send("Comment not found");
    return;
  } else {
    next();
  }
};
