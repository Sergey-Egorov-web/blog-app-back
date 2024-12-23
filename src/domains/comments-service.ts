import { commentRepository } from "../repositories/comment-db-repository";
import { postRepository } from "../repositories/posts-db-repository";

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
};
