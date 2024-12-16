import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { userLoginValidation } from "../../middlewares/user-validation/user-login-validation";
import { userEmailValidation } from "../../middlewares/user-validation/user-email-validation";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import {
  APIError,
  UserDbType,
  UserInputModel,
  UserViewModel,
} from "../../types";
import { usersService } from "../../domains/users-services/users-service";
import { SortDirection } from "mongodb";
import { usersQueryRepository } from "../../repositories/user-repository/user-db-query-repository";
import { userPasswordValidation } from "../../middlewares/user-validation/user-password-validation";

export const usersRouter = Router({});

usersRouter.post(
  "/",
  basicAuthorizationMiddleware,
  userLoginValidation(),
  userPasswordValidation(),
  userEmailValidation(),
  inputValidationMiddleware,

  async (req: Request, res: Response) => {
    const userCreateData: UserInputModel = req.body;
    const newUser: UserViewModel | APIError = await usersService.addNewUser(
      userCreateData
    );
    // console.log(newUser);
    // if (newUser) {
    //   res.status(201).send(newUser);
    // } else {
    //   res.status(400).send(newUser);
    // }
    if ("errorsMessages" in newUser) {
      // Если это объект ошибки
      res.status(400).send(newUser);
    } else {
      // Если это объект пользователя
      res.status(201).send(newUser);
    }
  }
);

usersRouter.get("/", async (req: Request, res: Response) => {
  const searchLoginTerm: string | null = req.query.searchLoginTerm
    ? req.query.searchLoginTerm.toString()
    : null;
  const searchEmailTerm: string | null = req.query.searchEmailTerm
    ? req.query.searchEmailTerm.toString()
    : null;
  const sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
  const sortDirection: SortDirection =
    req.query.sortDirection && req.query.sortDirection.toString() === "asc"
      ? "asc"
      : "desc";
  const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
  const pageSize = req.query.pageSize ? +req.query.pageSize : 10;

  console.log(searchEmailTerm, searchLoginTerm);

  const allUsers = await usersQueryRepository.findAllUsers(
    sortBy,
    sortDirection,
    pageNumber,
    pageSize,
    searchLoginTerm,
    searchEmailTerm
  );

  res.status(200).send(allUsers);
});

usersRouter.delete(
  "/:id",
  basicAuthorizationMiddleware,
  // checkBlogExistsMiddleware,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const answer = await usersService.deleteUserById(id);
    // console.log(answer);
    if (answer === true) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
