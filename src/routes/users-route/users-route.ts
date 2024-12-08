import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { userLoginValidation } from "../../middlewares/user-validation/user-login-validation";
import { userEmailValidation } from "../../middlewares/user-validation/user-email-validation";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { UserDbType, UserInputModel, UserViewModel } from "../../types";
import { usersService } from "../../domains/users-service";
import { SortDirection } from "mongodb";
import { usersQueryRepository } from "../../repositories/user-repository/user-db-query-repositiory";

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
    const newUser: UserViewModel | null = await usersService.addNewUser(
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
