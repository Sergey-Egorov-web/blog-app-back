import { commentRepository } from "../repositories/comment-db-repository";
import { postRepository } from "../repositories/posts-db-repository";
import { CommentViewModel } from "../types/comment-types";

export const commentsService = {
  async deleteAllComments(): Promise<boolean> {
    const result = await commentRepository.deleteAllComments();

    if (result === true) {
      return true;
    } else {
      return false;
    }
  },
  async deleteCommentById(id: string): Promise<boolean> {
    const result = await commentRepository.deleteCommentById(id);
    if (result === true) {
      return true;
    } else {
      return false;
    }
  },

  async updateCommentById(
    commentUpdateData: string,
    commentId: string
  ): Promise<CommentViewModel | null> {
    const updateComment = await commentRepository.updateCommentById(
      commentId,
      commentUpdateData
    );

    // let updateBlog = await blogsQueryRepository.findBlogById(id);
    if (updateComment) {
      return updateComment;
    } else {
      return null;
    }
  },
};
