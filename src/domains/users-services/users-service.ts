import { usersRepository } from "../../repositories/user-repository/user-db-repository";
import {
  APIError,
  LoginInputModel,
  UserDbType,
  UserInputModel,
  UserViewModel,
} from "../../types";
import bcrypt from "bcrypt";
import { validateUserService } from "./validate-user-service";
import { usersQueryRepository } from "../../repositories/user-repository/user-db-query-repository";

// const bcrypt = require('bcrypt');

export const usersService = {
  async addNewUser(user: UserInputModel): Promise<UserViewModel | APIError> {
    let errorsMessages: { field: string; message: string }[] = [];

    errorsMessages = await validateUserService.validateUser(user);

    if (errorsMessages.length) {
      return { errorsMessages };
    } else {
      const hash: string = await getHash(user.password);
      const newUser: UserDbType = {
        id: Date.now().toString(),
        login: user.login,
        password: hash,
        email: user.email,
        createdAt: new Date().toISOString(),
      };

      // console.log(newUser.password);

      const result: UserViewModel | null = await usersRepository.addNewUser(
        newUser
      );

      if (result) {
        return result;
      } else {
        return {
          errorsMessages: [{ field: "server", message: "Failed to add user" }],
        };
      }
    }
  },

  async deleteUserById(id: string): Promise<boolean> {
    const result: boolean = await usersRepository.deleteUserById(id);
    console.log(result);
    if (result === true) {
      return true;
    } else {
      return false;
    }
  },
  async deleteAllUsers(): Promise<boolean> {
    const result = await usersRepository.deleteAllUsers();

    if (result === true) {
      return true;
    } else {
      return false;
    }
  },
  async checkUser(user: LoginInputModel): Promise<boolean> {
    let checkUser: UserViewModel | null =
      await usersQueryRepository.findUserByLoginOrPassword(
        user.loginOrEmail,
        user.password
      );

    console.log(user.loginOrEmail);

    if (checkUser) {
      return true;
    } else {
      return false;
    }
  },
};

async function getHash(password: string): Promise<string> {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return hashedPassword;
}
