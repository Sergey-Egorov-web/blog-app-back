// import { password } from "../configuration";
import { usersRepository } from "../repositories/user-repository/user-db-repository";
import { UserDbType, UserInputModel, UserViewModel } from "../types";

export const usersService = {
  async addNewUser(user: UserInputModel): Promise<UserViewModel | null> {
    // const user: UserDbType | null = await {
    if (user) {
      const newUser: UserDbType | null = {
        id: Date.now().toString(),
        login: user.login,
        password: user.password.toString(),
        email: user.email,
        createdAt: new Date().toISOString(),
      };

      const result = await usersRepository.addNewUser(newUser);

      if (result) {
        return result;
      } else {
        return null;
      }
    }
    return null;
  },
};
