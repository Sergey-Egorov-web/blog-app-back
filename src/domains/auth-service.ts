import { usersRepository } from "../repositories/user-repository/user-db-repository";
import {
  APIError,
  FieldError,
  UserDbType,
  UserInputModel,
  UserViewModel,
} from "../types/types";
import { getHash } from "./users-services/users-service";
import { validateUserService } from "./users-services/validate-user-service";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns/add";
import { error } from "console";
import { emailsService } from "./emails-service";
import { usersQueryRepository } from "../repositories/user-repository/user-db-query-repository";

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
    console.log(errorsMessages);
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
      // await emailsService.sendEmailConfirmationMessage(newUser);

      //   return createResult;
      if (createResult) {
        try {
          await emailsService.sendEmailConfirmationMessage(newUser);
        } catch (error) {
          console.error("Ошибка при отправке email:", error);
          await usersRepository.deleteUserById(createResult.id);
          return {
            errorsMessages: [
              {
                field: "email",
                message: "Не удалось отправить письмо с кодом подтверждения",
              },
            ],
          }; // Возвращаем APIError
        }
        return createResult;
      } else {
        return {
          errorsMessages: [{ field: "server", message: "Failed to add user" }],
        };
      }
    }
  },

  async confirmEmail(code: string) {
    const user: UserDbType | null = await usersQueryRepository.findUserByCode(
      code
    );
    // let errorsMessages: FieldError[] | null = [];
    let errorsMessages: { field: string; message: string }[] = [];
    if (!user) {
      errorsMessages.push({ field: "user", message: "there is no such user" });
      return { errorsMessages };
    }
    if (user.emailConfirmation.confirmationCode !== code) {
      errorsMessages.push({
        field: "confirmationCode",
        message: "confirmationCode isn't correct",
      });
      return { errorsMessages };
    }
    if (user.emailConfirmation.expirationDate)
      if (user.emailConfirmation.expirationDate < new Date()) {
        errorsMessages.push({
          field: "expirationDate",
          message: "expirationDate has expired",
        });
        return { errorsMessages };
      }
    if (user.emailConfirmation.isConfirmed) {
      errorsMessages.push({
        field: "isConfirmed",
        message: "the user has already been confirmed",
      });
      return { errorsMessages };
    }

    const result: boolean = await usersRepository.updateConfirmation(user.id);
    return result;
  },
};
