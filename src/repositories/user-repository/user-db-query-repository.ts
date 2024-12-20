import {
  meViewModel,
  PaginatorUserViewModel,
  UserDbType,
  UserViewModel,
} from "../../types/types";
import { userCollection } from "../db";
import bcrypt from "bcrypt";
export const usersQueryRepository = {
  async findAllUsers(
    sortBy: string,
    sortDirection: string,
    pageNumber: number,
    pageSize: number,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
  ): Promise<PaginatorUserViewModel | null> {
    let filter: any = {};

    if (searchLoginTerm && searchLoginTerm) {
      filter.$or = [
        { login: { $regex: searchLoginTerm, $options: "i" } },
        { email: { $regex: searchEmailTerm, $options: "i" } },
      ];
    } else {
      if (searchLoginTerm)
        filter.login = { $regex: searchLoginTerm, $options: "i" };

      if (searchEmailTerm) {
        filter.email = { $regex: searchEmailTerm, $options: "i" };
      }
    }

    console.log(filter);

    const foundUsers = await userCollection
      .find(filter)

      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalCount = await userCollection.countDocuments(filter);
    const page = pageNumber;
    const pagesCount = Math.ceil(totalCount / pageSize);

    const resultWithoutMongoId = foundUsers.map((user) => ({
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    }));

    const result: PaginatorUserViewModel = {
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      items: resultWithoutMongoId,
    };

    return result;
  },

  async findUserByLoginOrPassword(
    loginOrEmail: string,
    password: string
  ): Promise<UserViewModel | null> {
    const user: UserDbType | null = await userCollection.findOne({
      $or: [
        { login: loginOrEmail }, // Ищем по логину
        { email: loginOrEmail }, // Ищем по email
      ],
    });

    if (!user) {
      return null;
    }
    // const hash: string = await getHash(password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("password is incorrect");
      return null;
    }
    // console.log(user);
    return user;
  },

  async findUserById(userId: string): Promise<meViewModel | null> {
    // console.log("queryRepo", userId);
    const user: UserDbType | null = await userCollection.findOne({
      id: userId.toString,
    }); // Ищем по id
    // console.log("queryRepo", user);
    if (!user) {
      return null;
    }

    // if (user) {
    const resultWithoutMongoId: meViewModel = {
      email: user.email,
      login: user.login,
      userId: user.id,
    };

    return resultWithoutMongoId;
    // }
  },
};
