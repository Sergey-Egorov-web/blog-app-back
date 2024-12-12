import { PaginatorUserViewModel, UserDbType, UserViewModel } from "../../types";
import { userCollection } from "../db";

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
    login: string,
    password: string
  ): Promise<UserViewModel | null> {
    const user: UserDbType | null = await userCollection.findOne({
      login: login,
      email: login,
    });

    console.log(user);
    // if (user) {
    //   const resultWithoutMongoId: PostOutputType = {
    //     id: post.id,
    //     title: post.title,
    //     shortDescription: post.shortDescription,
    //     content: post.content,
    //     blogId: post.blogId,
    //     blogName: post.blogName,
    //     createdAt: post.createdAt,
    //   };
    //   return resultWithoutMongoId;
    // } else {
    //   return null;
    // }
    return user;
  },
};
