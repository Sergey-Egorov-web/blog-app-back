import { usersRepository } from "../repositories/user-repository/user-db-repository";
import {
  APIError,
  UserDbType,
  UserInputModel,
  UserViewModel,
} from "../types/types";
import { getHash } from "./users-services/users-service";
import { validateUserService } from "./users-services/validate-user-service";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns/add";

export const authService = {
  async createUser(
    login: string,
    email: string,
    password: string
    // user: UserInputModel
  ): Promise<UserViewModel | APIError> {
    let errorsMessages: { field: string; message: string }[] = [];

    const user: UserInputModel = {
      login: login,
      email: email,
      password: password,
    };

    errorsMessages = await validateUserService.validateUser(user);

    if (errorsMessages.length) {
      return { errorsMessages };
    } else {
      const hash: string = await getHash(password);
      const newUser: UserDbType = {
        id: Date.now().toString(),
        login: login,
        password: hash,
        email: email,
        createdAt: new Date().toISOString(),
        emailConfirmation: {
          confirmationCode: uuidv4(),
          expirationDate: add(new Date(), { hours: 1, minutes: 3 }),
          isConfirmed: false,
        },
      };

      const createResult: UserViewModel | null =
        await usersRepository.addNewUser(newUser);
      // await emailManager.sendEmailConfirmationMessage(user);

      //   return createResult;
      if (createResult) {
        return createResult;
      } else {
        return {
          errorsMessages: [{ field: "server", message: "Failed to add user" }],
        };
      }
    }
  },
};
