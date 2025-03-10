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

    const totalCount = (await commentCollection.find(filter).toArray()).length;
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
  async findCommentById(id: string): Promise<CommentViewModel | null> {
    const comment: CommentDbType | null = await commentCollection.findOne({
      id,
    });
    if (comment) {
      const resultWithoutMongoId: CommentViewModel = {
        id: comment.id,
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt,
      };
      return resultWithoutMongoId;
    } else {
      return null;
    }
  },
};
