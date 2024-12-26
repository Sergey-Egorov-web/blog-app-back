import { Request, Response, NextFunction } from "express";
import { jwtService } from "../../application/jwtService";
import { CommentDbType, CommentViewModel } from "../../types/comment-types";
import { commentQueryRepository } from "../../repositories/comment-db-query-repository";

export const checkCommentIsYourOwn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId: string = req.params.id;
  console.log("checkCommentIsYourOwn1 commentId", req.params.id);

  const comment: CommentViewModel | null =
    await commentQueryRepository.findCommentById(commentId);

  const authHeader = req.headers.authorization;
  console.log("checkCommentIsYourOwn authHeader", authHeader);
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }
  const token: string | null = authHeader.split(" ")[1];
  // try {
  if (token) {
    const userId: string = await jwtService.getUserIdByToken(token);

    if (!userId) {
      res.sendStatus(401);
      return;
    }
    if (comment) {
      console.log("checkCommentIsYourOwn2", comment.commentatorInfo.userId);
      console.log("checkCommentIsYourOwn3", req.userId);
      if (comment.commentatorInfo.userId !== req.userId) {
        res.sendStatus(403);
        return;
      }

      next();
    }
    //   }
    // } catch (error) {
    //   console.error("Error while processing token:", error);
    //   return;
  }
};
