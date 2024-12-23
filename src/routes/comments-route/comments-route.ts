import { Request, Response, Router } from "express";
import { commentQueryRepository } from "../../repositories/comment-db-query-repository";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { commentsService } from "../../domains/comments-service";

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
  basicAuthorizationMiddleware,
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
