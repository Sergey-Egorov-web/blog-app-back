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
};
