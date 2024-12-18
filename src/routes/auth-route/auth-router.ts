import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { APIError, LoginInputModel, UserViewModel } from "../../types";
import { usersService } from "../../domains/users-services/users-service";
import { userPasswordValidation } from "../../middlewares/user-validation/user-password-validation";
import { userLoginOrEmailValidation } from "../../middlewares/user-validation/user-login-or-email-validation";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { jwtService } from "../../application/jwtService";

export const authRouter = Router({});

authRouter.post(
  "/:login",
  // basicAuthorizationMiddleware,
  userLoginOrEmailValidation(),
  userPasswordValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const loginInputData: LoginInputModel = req.body;
    const user: UserViewModel | APIError = await usersService.checkUser(
      loginInputData
    );
    if ("id" in user) {
      // console.log("Success");
      const token = await jwtService.createJWT(user);
      res.status(200).send(token);
    } else {
      res.status(401).json(user);
    }
  }
);
