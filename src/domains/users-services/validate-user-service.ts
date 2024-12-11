import { usersRepository } from "../../repositories/user-repository/user-db-repository";
import { UserInputModel, UserViewModel } from "../../types";
// import { getUsersLogins } from "./users-service";

export const validateUserService = {
  validateUser: async (user: UserInputModel) => {
    const errorsMessages: { field: string; message: string }[] = [];

    if (user.email === "") {
      errorsMessages.push({ field: "email", message: "email cant be empty" });
    }
    if (user.login === "") {
      errorsMessages.push({ field: "login", message: "login cant be empty" });
    }
    if (user.password === "") {
      errorsMessages.push({
        field: "password",
        message: "password cant be empty",
      });
    }

    const userLogins = await getUsersLogins();
    const userEmails = await getUsersEmails();

    let checkLogin: boolean = await checkUniqueLogin(user.login, userLogins);

    if (checkLogin === true) {
      errorsMessages.push({ field: "login", message: "login must be unique" });
    }

    let checkEmail: boolean = await checkUniqueEmail(user.email, userEmails);

    if (checkEmail == true) {
      errorsMessages.push({ field: "email", message: "email must be unique" });
    }

    return errorsMessages;
  },
};

async function getUsersLogins(): Promise<string[]> {
  let users: UserViewModel[] | null = await usersRepository.findAllUsers();

  if (users) {
    const usersLogin = users.map((user) => user.login);
    console.log(usersLogin);
    return usersLogin;
  } else {
    return [];
  }
}

async function getUsersEmails(): Promise<string[]> {
  let users: UserViewModel[] | null = await usersRepository.findAllUsers();

  if (users) {
    const usersEmail = users.map((user) => user.email);
    return usersEmail;
  } else {
    return [];
  }
}

async function checkUniqueLogin(
  login: string,
  userLogins: string[]
): Promise<boolean> {
  return userLogins.includes(login);
}

async function checkUniqueEmail(
  email: string,
  userEmails: string[]
): Promise<boolean> {
  return userEmails.includes(email);
}
