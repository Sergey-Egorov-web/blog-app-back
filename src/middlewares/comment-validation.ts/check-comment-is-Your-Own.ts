import { Request, Response, NextFunction } from "express";
import { jwtService } from "../../application/jwtService";
import { CommentDbType, CommentViewModel } from "../../types/comment-types";
import { commentQueryRepository } from "../../repositories/comment-db-query-repository";

export const checkCommentIsYourOwn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId: string = req.params.commentId;

  const comment: CommentViewModel | null =
    await commentQueryRepository.findCommentById(commentId);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401);
  } else {
    const token: string | null = authHeader.split(" ")[1];
    try {
      if (token) {
        const userId: string = await jwtService.getUserIdByToken(token);

        if (!userId) {
          res.sendStatus(401);
        }
        if (comment) {
          if (comment.commentatorInfo.userId !== userId) {
            res.sendStatus(403);
          }

          next();
        }
      }
    } catch (error) {
      console.error("Error while processing token:", error);
    }
  }
};
