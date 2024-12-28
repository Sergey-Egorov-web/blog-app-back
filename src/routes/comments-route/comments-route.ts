import { Request, Response, Router } from "express";
import { commentQueryRepository } from "../../repositories/comment-db-query-repository";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { commentsService } from "../../domains/comments-service";
import { jwtAuthorizationMiddleware } from "../../middlewares/jwt-authorization-middleware";
import { checkCommentExistsMiddleware } from "../../middlewares/comment-validation.ts/check-comment-exist-middleware";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { checkCommentIsYourOwn } from "../../middlewares/comment-validation.ts/check-comment-is-Your-Own";
import { contentCommentValidation } from "../../middlewares/content-comment-validation";
import { meViewModel } from "../../types/types";
import { usersQueryRepository } from "../../repositories/user-repository/user-db-query-repository";
import { CommentViewModel } from "../../types/comment-types";

export const commentsRouter = Router({});

commentsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  let comment = await commentQueryRepository.findCommentById(id);
  if (comment) {
    res.send(comment);
  } else res.sendStatus(404);
});

commentsRouter.delete(
  "/:id",
  jwtAuthorizationMiddleware,
  checkCommentExistsMiddleware,
  checkCommentIsYourOwn,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const answer = await commentsService.deleteCommentById(id);
    if (answer === true) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

//Update comment for id
commentsRouter.put(
  "/comments/:id",
  jwtAuthorizationMiddleware,
  contentCommentValidation(),
  checkCommentExistsMiddleware,
  checkCommentIsYourOwn,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    if (!req.userId) {
      res.sendStatus(401);
    }

    // if (req.userId) {
    //   const user: meViewModel | null = await usersQueryRepository.findUserById(
    //     req.userId
    //   );
    const commentUpdateData: string = req.body.content;

    const commentId: string = req.params.id;
    const updateComment: CommentViewModel | null =
      await commentsService.updateCommentById(commentUpdateData, commentId);

    if (updateComment !== null) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Comment with this id did not found");
    }
  }
);
