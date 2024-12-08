import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { userLoginValidation } from "../../middlewares/user-validation/user-login-validation";
import { userEmailValidation } from "../../middlewares/user-validation/user-email-validation";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { UserDbType, UserInputModel, UserOutputModel } from "../../types";
import { usersService } from "../../domains/users-service";

export const usersRouter = Router({});

usersRouter.post(
  "/",
  basicAuthorizationMiddleware,
  userLoginValidation(),
  userLoginValidation(),
  userEmailValidation(),
  inputValidationMiddleware,

  async (req: Request, res: Response) => {
    const userCreateData: UserInputModel = req.body;
    const newUser: UserOutputModel = await usersService.addNewUser(
      userCreateData
    );

    if (newUser) {
      res.status(201).send(newUser);
    }
    // else {
    //   res.status(404).send("Blog not found");
    // }
  }
);
