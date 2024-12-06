import {
  BlogDbType,
  BlogOutputType,
  PaginatorBlogViewModel,
  PostOutputType,
} from "../types";
import { blogCollection, postCollection } from "./db";

export const blogsQueryRepository = {
  async findAllBlogs(
    searchNameTerm: string | null,
    sortBy: string,
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatorBlogViewModel | null> {
    // const result = await blogCollection.find({}).toArray();
    const filter: any = {};
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    console.log(filter);
    const foundBlogs = await blogCollection
      // .find({ name: { $regex: searchNameTerm, $options: "i" } })
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? "desc" : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    // const totalCount = foundBlogs.length;
    const totalCount = (await blogCollection.find(filter).toArray()).length;
    const page = pageNumber;
    const pageCount = Math.ceil(totalCount / pageSize);

    const resultWithoutMongoId = foundBlogs.map((model) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      websiteUrl: model.websiteUrl,
      createdAt: model.createdAt,
      isMembership: model.isMembership,
    }));

    // console.log(resultWithoutMongoId);

    const result: PaginatorBlogViewModel = {
      pageCount: pageCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      items: resultWithoutMongoId,
    };
    // console.log(resultWithoutMongoId);

    return result;
    // return result;
  },

  async findBlog(id: string): Promise<BlogOutputType | null> {
    const blog: BlogOutputType | null = await blogCollection.findOne({ id });

    if (blog) {
      const resultWithoutMongoId: BlogOutputType = {
        id: blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
      };

      return resultWithoutMongoId;
    } else {
      return null;
    }
  },

  async findAllPostsByBlogId(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: "asc" | "desc",
    blogId: string
  ): Promise<PostOutputType[] | null> {
    const filter: any = {};

    const result: PostOutputType[] = [];

    console.log(filter);
    const foundPosts = await postCollection

      .find({ blogId })
      .sort({ [sortBy]: sortDirection === "asc" ? "desc" : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    // console.log(`foundPosts: ${JSON.stringify(foundPosts)}`);

    if (foundPosts) {
      return foundPosts;
    } else {
      return null;
    }
  },
};
