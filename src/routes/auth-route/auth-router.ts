import { NextFunction, Request, Response, Router } from "express";
import {
  APIError,
  FieldError,
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
import { sessionsService } from "../../application/sessions-service";

export const authRouter = Router({});

authRouter.post(
  "/login",
  userLoginOrEmailValidation(),
  userPasswordValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    try {
      const loginInputData: LoginInputModel = req.body;
      const ip: string = req.ip ? req.ip : "1"; // Если req.ip существует, используем его, иначе "1"
      const title = req.headers["user-agent"]
        ? req.headers["user-agent"]
        : "title undefined";
      // console.log("authRouter/login1", loginInputData);
      const user: UserViewModel | APIError = await usersService.checkUser(
        loginInputData
      );
      // console.log("authRouter/login2", user);
      if (!user) {
        res.sendStatus(401);
        return;
      }
      if ("id" in user) {
        //
        const accessToken = await jwtService.createAccessTokenJWT(user.id);
        //
        // console.log("authRouter/login3", accessToken);
        const refreshToken = await jwtService.createRefreshTokenJWT(user.id);
        // const decodedRefreshToken = jwt.verify(refreshToken, secretKey);
        // console.log("authRouter/login4", refreshToken);
        //

        const session = await jwtService.createNewSession(
          refreshToken,
          ip,
          title
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
        });
        res.status(200).send({ accessToken: accessToken });
      } else {
        res.status(401).json(user);
      }
    } catch (error) {
      res.json(error);
    }
  }
);
authRouter.post(
  "/logout",
  // basicAuthorizationMiddleware,

  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.sendStatus(401);
      return;
    }

    const checkRefreshToken = await jwtService.checkRefreshTokenIntoBlacklist(
      refreshToken
    );

    if (checkRefreshToken === true) {
      res.sendStatus(401);
      return;
    }

    const decoded = await jwtService.verifyRefreshToken(refreshToken);
    if (decoded === null) {
      res.sendStatus(401);
      return;
    }

    const userId: string | null = await jwtService.getUserIdByRefreshToken(
      refreshToken
    );

    if (userId) {
      const result = await jwtService.addRefreshTokenToBlacklist(refreshToken);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  }
);
authRouter.post("/refresh-token", async (req: Request, res: Response) => {
  // console.log("/refresh-token", req.cookies.refreshToken);
  const refreshToken = req.cookies.refreshToken;
  // console.log("authRouter/refresh-token1", refreshToken);
  const checkRefreshToken = await jwtService.checkRefreshTokenIntoBlacklist(
    refreshToken
  );
  // console.log("authRouter/refresh-token2", checkRefreshToken);

  if (checkRefreshToken === true) {
    res.sendStatus(401);
    return;
  }

  const decoded = await jwtService.verifyRefreshToken(refreshToken);
  console.log("authRouter-refresh-token2", decoded);
  if (decoded == null) {
    // res.status(401).json({ message: "Invalid or expired refresh token" });

    res.sendStatus(401);
    return;
  }

  const userId: string | null = await jwtService.getUserIdByRefreshToken(
    refreshToken
  );
  // console.log("/refresh-token", userId);
  // console.log("authRouter/refresh-token3", userId);
  if (!userId) {
    res.status(401).json({ message: "Refresh token is missing" });
    return;
    // res.sendStatus(401);
  }
  //
  const newAccessToken = await jwtService.createAccessTokenJWT(userId);
  //
  // console.log("authRouter/refresh-token4", newAccessToken);
  const newRefreshToken = await jwtService.createRefreshTokenJWT(userId);
  //
  // console.log("authRouter/refresh-token5", newRefreshToken);
  const result = await jwtService.addRefreshTokenToBlacklist(refreshToken);
  // console.log("authRouter/refresh-token6", result);
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
  });
  res.status(200).send({ accessToken: newAccessToken });
});

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
      // console.log(user);
      // Если это ошибка, возвращаем статус 400 и тело ошибки
      res.status(400).json(user);
      return;
    } else {
      // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
      res.sendStatus(204);
      return;
    }
  }
);

authRouter.post(
  "/registration-confirmation",

  async (req: Request, res: Response) => {
    const code: string = req.body.code;

    const result: boolean | APIError = await authService.confirmEmail(code);

    // Проверка, является ли результат ошибкой

    if (typeof result === "object" && "errorsMessages" in result) {
      // console.log(result);
      // Если это ошибка, возвращаем статус 400 и тело ошибки
      res.status(400).json(result);
    } else {
      // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
      res.sendStatus(204);
    }
  }
);

authRouter.post(
  "/registration-email-resending",
  userEmailValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const user: UserViewModel | APIError = await authService.resendEmail(email);
    if ("errorsMessages" in user) {
      // Если это ошибка, возвращаем статус 400 и тело ошибки
      res.status(400).json(user);
    }

    // Если пользователь успешно создан, возвращаем статус 201 и данные пользователя
    res.sendStatus(204);
  }
);
