import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { APIError, LoginInputModel, UserViewModel } from "../../types";
import { usersService } from "../../domains/users-services/users-service";
import { userPasswordValidation } from "../../middlewares/user-validation/user-password-validation";
import { userLoginOrEmailValidation } from "../../middlewares/user-validation/user-login-or-email-validation";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { jwtService } from "../../application/jwtService";
import { usersQueryRepository } from "../../repositories/user-repository/user-db-query-repository";

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

authRouter.get("/:me", async (req: Request, res: Response) => {
  // const loginInputData: LoginInputModel = req.body;

  // Middleware для проверки токена

  // const authHeader = req.headers['authorization'];
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token: string | null = authHeader.split(" ")[1];
    try {
      if (token) {
        const userId = await jwtService.getUserIdByToken(token);
        console.log('authRouter.get("/:me"', userId);
        const user = await usersQueryRepository.findUserById(userId);
        // console.log(user);
        res.status(200).send(user);
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.error("Error while processing token:", error);
    }
  }

  // if ("id" in user) {
  //   // console.log("Success");
  //   const token = await jwtService.createJWT(user);
  //   res.status(200).send(token);
  // } else {
  //   res.status(401).json(user);
  // }
});
