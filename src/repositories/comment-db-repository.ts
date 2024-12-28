import {
  CommentDbType,
  CommentViewModel,
  PaginatorCommentViewModel,
} from "../types/comment-types";
import { commentCollection } from "./db";

export const commentRepository = {
  async deleteAllComments(): Promise<boolean> {
    const result = await commentCollection.deleteMany({});
    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },
  async deleteCommentById(id: string): Promise<boolean> {
    const result = await commentCollection.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  },
  async updateCommentById(
    id: string,
    commentUpdateData: string
  ): Promise<CommentViewModel | null> {
    // const updateComment: CommentViewModel | null =
    await commentCollection.updateOne(
      {
        id: id,
      },
      {
        $set: {
          content: commentUpdateData,
        },
      }
    );

    const result = await commentCollection.findOne({
      id,
    });
    if (!result) {
      return null;
    } else {
      return result;
    }
  },
};
