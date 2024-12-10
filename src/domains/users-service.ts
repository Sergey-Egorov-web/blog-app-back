import { usersRepository } from "../repositories/user-repository/user-db-repository";
import {
  APIError,
  FieldError,
  UserDbType,
  UserInputModel,
  UserViewModel,
} from "../types";
import bcrypt from "bcrypt";

// const bcrypt = require('bcrypt');

export const usersService = {
  async addNewUser(user: UserInputModel): Promise<UserViewModel | APIError> {
    const errorsMessages: { field: string; message: string }[] = [];
    let errorCount: number = 0;

    if (user.email === "") {
      errorsMessages.push({ field: "email", message: "email cant be empty" });
      errorCount++;
    }
    if (user.login === "") {
      errorsMessages.push({ field: "login", message: "login cant be empty" });
      errorCount++;
    }
    if (user.password === "") {
      errorsMessages.push({
        field: "password",
        message: "password cant be empty",
      });
      errorCount++;
    }

    const userLogins = await getUsersLogins();

    async function checkUniqueLogin(
      login: string,
      userLogins: string[]
    ): Promise<boolean> {
      userLogins.forEach((element) => {
        if ((login = element)) {
          return true;
        }
      });
      return false;
    }

    let checkLogin: boolean = await checkUniqueLogin(user.login, userLogins);

    if ((checkLogin = true)) {
      errorsMessages.push({ field: "login", message: "login must be unique" });
    }
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

      console.log(newUser.password);

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
};

async function getHash(password: string): Promise<string> {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function getUsersLogins(): Promise<string[]> {
  let users: UserViewModel[] | null = await usersRepository.findAllUsers();

  if (users) {
    const usersLogin = users.map((user) => user.login);
    return usersLogin;
  } else {
    return [];
  }
}
