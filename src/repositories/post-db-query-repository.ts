import { PaginatorPostViewModel, PostOutputType } from "../types/types";
import { postCollection } from "./db";

export const postQueryRepository = {
  async findAllPosts(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: "asc" | "desc"
  ): Promise<PaginatorPostViewModel | null> {
    const filter: any = {};
    const foundPosts: PostOutputType[] | null = await postCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    //
    // console.log()
    const totalCount = (await postCollection.find().toArray()).length;
    const page = pageNumber;
    const pagesCount = Math.ceil(totalCount / pageSize);

    if (foundPosts) {
      const resultWithoutMongoId: PostOutputType[] | null = foundPosts.map(
        (post) => ({
          id: post.id,
          title: post.title,
          shortDescription: post.shortDescription,
          content: post.content,
          blogId: post.blogId,
          blogName: post.blogName,
          createdAt: post.createdAt,
        })
      );

      const result: PaginatorPostViewModel = {
        pagesCount: pagesCount,
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        items: resultWithoutMongoId,
      };

      return result;
    } else {
      return null;
    }
  },
  async findPostById(id: string): Promise<PostOutputType | null> {
    const post: PostOutputType | null = await postCollection.findOne({ id });
    if (post) {
      const resultWithoutMongoId: PostOutputType = {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
      };
      return resultWithoutMongoId;
    } else {
      return null;
    }
  },
};
