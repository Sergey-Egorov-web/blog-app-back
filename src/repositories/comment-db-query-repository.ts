import {
  CommentDbType,
  CommentViewModel,
  PaginatorCommentViewModel,
} from "../types/comment-types";
import { commentCollection, postCollection } from "./db";

export const commentQueryRepository = {
  async findAllCommentsForSpecifiedPost(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: "asc" | "desc",
    postId: string
  ): Promise<PaginatorCommentViewModel | null> {
    const filter: any = {};
    filter.postId = postId;
    const foundComments: CommentDbType[] | null = await commentCollection
      // const foundComments = await commentCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalCount = (await commentCollection.find().toArray()).length;
    const page = pageNumber;
    const pagesCount = Math.ceil(totalCount / pageSize);

    if (foundComments) {
      const resultWithoutMongoId: CommentViewModel[] | null = foundComments.map(
        (comment) => ({
          id: comment.id,
          content: comment.content,
          commentatorInfo: comment.commentatorInfo,
          createdAt: comment.createdAt,
        })
      );

      const result: PaginatorCommentViewModel = {
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
  //   async findPostById(id: string): Promise<PostOutputType | null> {
  //     const post: PostOutputType | null = await postCollection.findOne({ id });
  //     if (post) {
  //       const resultWithoutMongoId: PostOutputType = {
  //         id: post.id,
  //         title: post.title,
  //         shortDescription: post.shortDescription,
  //         content: post.content,
  //         blogId: post.blogId,
  //         blogName: post.blogName,
  //         createdAt: post.createdAt,
  //       };
  //       return resultWithoutMongoId;
  //     } else {
  //       return null;
  //     }
  //   },
};
