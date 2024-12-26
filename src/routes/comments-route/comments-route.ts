import { Request, Response, Router } from "express";
import { commentQueryRepository } from "../../repositories/comment-db-query-repository";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { commentsService } from "../../domains/comments-service";
import { jwtAuthorizationMiddleware } from "../../middlewares/jwt-authorization-middleware";
import { checkCommentExistsMiddleware } from "../../middlewares/comment-validation.ts/check-comment-exist-middleware";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { checkCommentIsYourOwn } from "../../middlewares/comment-validation.ts/check-comment-is-Your-Own";

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
