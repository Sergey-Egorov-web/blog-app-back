import { UserDbType, UserOutputModel } from "../../types";
import { userCollection } from "../db";

export const usersRepository = {
  async addNewUser(newUser: UserDbType): Promise<string | null> {
    await userCollection.insertOne(newUser);

    const result = await userCollection.findOne({
      id: newUser.id,
    });

    if (result) {
      //     const resultWithoutMongoId: BlogOutputType = {
      //       id: result.id,
      //       name: result.name,
      //       description: result.description,
      //       websiteUrl: result.websiteUrl,
      //       createdAt: result.createdAt,
      //       isMembership: result.isMembership,
      //     };

      return result.id;
    } else {
      return null;
    }
  },
};
