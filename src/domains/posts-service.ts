import { blogsQueryRepository } from "../repositories/blog-db-query-repository";
import { postQueryRepository } from "../repositories/post-db-query-repository";
import { postRepository } from "../repositories/posts-db-repository";
import {
  CommentatorInfo,
  CommentDbType,
  CommentInputModel,
  CommentViewModel,
} from "../types/comment-types";
import {
  BlogDbType,
  PostDbType,
  PostInputType,
  PostOutputType,
  UserDbType,
} from "../types/types";
// import { BlogDbType, blogsRepository } from "./blogs-db-repository";
import { blogsService } from "./blogs-service";
// import { postCollection } from "./db";

// export let posts: PostDbType[] = [];

export const postService = {
  async deleteAllPosts(): Promise<boolean> {
    const result = await postRepository.deleteAllPosts();
    if (result === true) {
      return true;
    } else {
      return false;
    }
  },
  async deletePostById(id: string): Promise<boolean> {
    const result = await postRepository.deletePostById(id);
    if (result === true) {
      return true;
    } else {
      return false;
    }
  },
  async addNewPost(post: PostInputType): Promise<PostOutputType | null> {
    const blog: BlogDbType | null = await blogsQueryRepository.findBlogById(
      post.blogId
    );

    if (blog) {
      const newPost: PostOutputType | null = {
        id: Date.now().toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: blog.name,
        createdAt: new Date().toISOString(),
      };
      const result = await postRepository.addNewPost(newPost);

      if (result) {
        return result;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  async updatePostById(
    id: string,
    post: PostInputType
  ): Promise<PostOutputType | null> {
    const result = await postRepository.updatePostById(id, post);
    if (!result) {
      return null;
    } else {
      return result;
    }
  },
  async addNewComment(
    comment: string,
    postId: string,
    commentator: CommentatorInfo
  ): Promise<CommentViewModel | null> {
    const post: PostDbType | null = await postQueryRepository.findPostById(
      postId
    );

    if (post) {
      const newComment: CommentDbType | null = {
        id: Date.now().toString(),
        content: comment,
        commentatorInfo: {
          userId: commentator.userId,
          userLogin: commentator.userLogin,
        },
        postId: postId,
        createdAt: new Date().toISOString(),
      };
      console.log("post-service", newComment);
      const result = await postRepository.addNewComment(newComment);

      if (result) {
        return result;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
};
