import { NextFunction, Request, Response, Router } from "express";
import {
  APIError,
  LoginInputModel,
  UserInputModel,
  UserViewModel,
} from "../../types/types";
import { usersService } from "../../domains/users-services/users-service";
import { userPasswordValidation } from "../../middlewares/user-validation/user-password-validation";
import { userLoginOrEmailValidation } from "../../middlewares/user-validation/user-login-or-email-validation";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { jwtService } from "../../application/jwtService";
import { usersQueryRepository } from "../../repositories/user-repository/user-db-query-repository";
import { jwtAuthorizationMiddleware } from "../../middlewares/jwt-authorization-middleware";
import { authService } from "../../domains/auth-service";
import { userEmailValidation } from "../../middlewares/user-validation/user-email-validation";
import { userLoginValidation } from "../../middlewares/user-validation/user-login-validation";

export const authRouter = Router({});

authRouter.post(
  "/login",
  // basicAuthorizationMiddleware,

  userLoginOrEmailValidation(),
  userPasswordValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const loginInputData: LoginInputModel = req.body;
    // const passwordInputData: string = req.body.password;

    const user: UserViewModel | APIError = await usersService.checkUser(
      loginInputData
    );

    if ("id" in user) {
      //
      const token = await jwtService.createJWT(user);
      //
      res.status(200).send({ accessToken: token });
    } else {
      res.status(401).json(user);
    }
  }
);

authRouter.get(
  "/me",
  jwtAuthorizationMiddleware,
  async (req: Request, res: Response) => {
    if (req.userId) {
      const user = await usersQueryRepository.findUserById(req.userId);

      res.status(200).send(user);
    }
  }
);

authRouter.post(
  "/registration",
  userLoginValidation(),
  userEmailValidation(),
  userPasswordValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const UserInputData: UserInputModel = req.body;
    const user: UserViewModel | APIError = await authService.createUser(
      UserInputData.login,
      UserInputData.email,
      UserInputData.password
    );

    // Проверка, является ли результат ошибкой
    if ("errorsMessages" in user) {
      // Если это ошибка, возвращаем статус 400 и тело ошибки
      res.status(400).json(user);
    }

    // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
    res.sendStatus(200);
  }
);
