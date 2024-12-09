import { usersRepository } from "../repositories/user-repository/user-db-repository";
import { UserDbType, UserInputModel, UserViewModel } from "../types";
import bcrypt from "bcrypt";

//  const bcrypt = require('bcrypt');

export const usersService = {
  async addNewUser(user: UserInputModel): Promise<UserViewModel | null> {
    // const user: UserDbType | null = await {

    // const passwordSalt = await bcrypt.genSalt(10);
    // const passwordHash = await this.generateHash(password, passwordSalt);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password.toString(), salt);

    if (user) {
      const newUser: UserDbType | null = {
        id: Date.now().toString(),
        login: user.login,
        password: hash,
        email: user.email,
        createdAt: new Date().toISOString(),
      };

      console.log(newUser.password);

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
