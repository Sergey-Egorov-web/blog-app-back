import { usersRepository } from "../repositories/user-repository/user-db-repository";
import {
  APIError,
  UserDbType,
  UserInputModel,
  UserViewModel,
} from "../types/types";
import { getHash } from "./users-services/users-service";
import { validateUserService } from "./users-services/validate-user-service";

export const authService = {
  async createUser(
    // login: string,
    // email: string,
    // password: string
    user: UserInputModel
  ): Promise<UserViewModel | APIError> {
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
