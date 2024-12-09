import { UserDbType, UserViewModel } from "../../types";
import { userCollection } from "../db";

export const usersRepository = {
  async addNewUser(newUser: UserDbType): Promise<UserViewModel | null> {
    await userCollection.insertOne(newUser);

    const result = await userCollection.findOne({
      id: newUser.id,
    });

    if (result) {
      const resultWithoutMongoId: UserViewModel = {
        id: result.id,
        login: result.login,
        email: result.email,
        createdAt: result.createdAt,
      };

      return resultWithoutMongoId;
    } else {
      return null;
    }
  },
};
