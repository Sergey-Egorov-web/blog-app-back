import { BlogDbType, PostOutputType } from "../types";
import { blogCollection, postCollection } from "./db";

export const blogsQueryRepository = {
  async findAllBlogs(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: "asc" | "desc",
    searchNameTerm: string | null
  ): Promise<PostOutputType[] | null> {
    const filter: any = {};

    if (searchNameTerm) {
      filter.title = { $regex: searchNameTerm, $option: "i" };
    }
    const result = await postCollection
      .find({})
      //.find({ filter })
      .sort({ [sortBy]: sortDirection === "asc" ? "desc" : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return result;
  },
};
