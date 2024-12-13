import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { APIError, LoginInputModel } from "../../types";
import { usersService } from "../../domains/users-services/users-service";
import { userPasswordValidation } from "../../middlewares/user-validation/user-password-validation";
import { userLoginOrEmailValidation } from "../../middlewares/user-validation/user-login-or-email-validation";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";

export const authRouter = Router({});

authRouter.post(
  "/:login",
  // basicAuthorizationMiddleware,
  userLoginOrEmailValidation(),
  userPasswordValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const loginInputData: LoginInputModel = req.body;
    const check: boolean | APIError = await usersService.checkUser(
      loginInputData
    );
    if (check === true) {
      console.log("Success");
      res.sendStatus(204);
    } else {
      res.status(400).json(check);
    }
  }
);
