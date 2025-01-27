import { add } from "date-fns";
import { UserDbType, UserViewModel } from "../../types/types";
import { userCollection } from "../db";

export const usersRepository = {
  async addNewUser(newUser: UserDbType): Promise<UserViewModel | null> {
    await userCollection.insertOne(newUser);

    const result = await userCollection.findOne({
      id: newUser.id,
    });
    console.log("user-db-repository", result);
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
  async findAllUsers(): Promise<UserViewModel[] | null> {
    const foundUsers = await userCollection.find().toArray();

    const resultWithoutMongoId = foundUsers.map((user) => ({
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    }));

    return resultWithoutMongoId;
  },
  async deleteUserById(id: string): Promise<boolean> {
    const result = await userCollection.deleteOne({ id });

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  },

  async deleteAllUsers(): Promise<boolean> {
    const result = await userCollection.deleteMany({});

    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },
  async updateConfirmation(id: string): Promise<boolean> {
    const result = await userCollection.updateOne(
      { id },
      { $set: { "emailConfirmation.isConfirmed": true } }
    );
    // Проверяем, был ли документ обновлён
    if (result.modifiedCount === 1) {
      const user = await userCollection.findOne({ id });

      return true; // Успешное обновление
    } else {
      return false; // Документ не был обновлён
    }
  },
  async updateConfirmationDate(id: string): Promise<boolean> {
    const newExpirationDate: Date = add(new Date(), { hours: 1, minutes: 3 });
    const result = await userCollection.updateOne(
      { id },
      { $set: { "emailConfirmation.expirationDate": newExpirationDate } }
    );
    return result.modifiedCount === 1;
  },
  async updateConfirmationCode(
    id: string,
    ConfirmationCode: string
  ): Promise<boolean> {
    const result = await userCollection.updateOne(
      { id },
      { $set: { "emailConfirmation.confirmationCode": ConfirmationCode } }
    );
    return result.modifiedCount === 1;
  },
};
