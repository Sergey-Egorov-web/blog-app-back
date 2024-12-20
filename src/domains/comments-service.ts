import { postRepository } from "../repositories/posts-db-repository";

export const commentsService = {
  async deleteAllComments(): Promise<boolean> {
    const result = await postRepository.deleteAllComments();

    if (result === true) {
      return true;
    } else {
      return false;
    }
  },
};
