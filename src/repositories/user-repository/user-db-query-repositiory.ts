import { PaginatorUserViewModel } from "../../types";
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
    const filter: any = {};

    if (searchLoginTerm) {
      filter.login = { $regex: searchLoginTerm, $options: "i" };
    }

    if (searchEmailTerm) {
      filter.email = { $regex: searchEmailTerm, $options: "i" };
    }

    const foundUsers = await userCollection

      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalCount = (await userCollection.find(filter).toArray()).length;
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
};
