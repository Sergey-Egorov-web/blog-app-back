import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { LoginInputModel } from "../../types";
import { usersService } from "../../domains/users-services/users-service";

export const authRouter = Router({});

authRouter.post(
  "/:login",
  basicAuthorizationMiddleware,
  async (req: Request, res: Response) => {
    const loginInputData: LoginInputModel = req.body;
    const check: boolean = await usersService.checkUser(loginInputData);
    if (check) {
      res.sendStatus(204);
    } else {
      res.status(400).send(check);
    }
  }
);
