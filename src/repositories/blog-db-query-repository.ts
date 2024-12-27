import {
  BlogDbType,
  BlogOutputType,
  PaginatorBlogViewModel,
  PaginatorPostViewModel,
  PostOutputType,
} from "../types/types";
import { blogCollection, postCollection } from "./db";

export const blogsQueryRepository = {
  async findAllBlogs(
    searchNameTerm: string | null,
    sortBy: string,
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatorBlogViewModel | null> {
    const filter: any = {};
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    //
    const foundBlogs = await blogCollection

      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalCount = (await blogCollection.find(filter).toArray()).length;
    const page = pageNumber;
    const pagesCount = Math.ceil(totalCount / pageSize);

    const resultWithoutMongoId = foundBlogs.map((blog) => ({
      id: blog.id,
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    }));

    //

    const result: PaginatorBlogViewModel = {
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      items: resultWithoutMongoId,
    };
    //

    return result;
    // return result;
  },

  async findBlogById(id: string): Promise<BlogOutputType | null> {
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
    blogId: string,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: "asc" | "desc"
  ): Promise<PaginatorPostViewModel | null> {
    const filter: any = {};

    // const result: PostOutputType[] = [];

    const foundPosts = await postCollection

      .find({ blogId })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    //

    const resultWithoutMongoId: PostOutputType[] | null = foundPosts.map(
      (model) => ({
        id: model.id,
        title: model.title,
        shortDescription: model.shortDescription,
        content: model.content,
        blogId: model.blogId,
        blogName: model.blogName,
        createdAt: model.createdAt,
      })
    );
    //
    const totalCount = (await postCollection.find({ blogId }).toArray()).length;
    const page = pageNumber;
    const pagesCount = Math.ceil(totalCount / pageSize);

    const result: PaginatorPostViewModel = {
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      items: resultWithoutMongoId,
    };

    if (result) {
      return result;
    } else {
      return null;
    }
  },
};
