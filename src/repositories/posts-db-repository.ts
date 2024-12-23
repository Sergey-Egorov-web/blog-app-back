import { CommentDbType, CommentViewModel } from "../types/comment-types";
import { PostDbType, PostInputType, PostOutputType } from "../types/types";

import { commentCollection, postCollection } from "./db";

export const postRepository = {
  async deleteAllPosts(): Promise<boolean> {
    const result = await postCollection.deleteMany({});
    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },

  // async deleteAllComments(): Promise<boolean> {
  //   const result = await commentCollection.deleteMany({});
  //   if (result.deletedCount > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },

  async deletePostById(id: string): Promise<boolean> {
    const result = await postCollection.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  },
  async addNewPost(newPost: PostDbType): Promise<PostOutputType | null> {
    await postCollection.insertOne(newPost);
    // console.log(newPost.id);
    const result = await postCollection.findOne({
      id: newPost.id,
    });

    if (result) {
      const resultWithoutMongoId: PostOutputType = {
        id: result.id,
        title: result.title,
        shortDescription: result.shortDescription,
        content: result.content,
        blogId: result.blogId,
        blogName: result.blogName,
        createdAt: result.createdAt,
      };

      return resultWithoutMongoId;
    } else {
      return null;
    }
    // } else {
    //   return null;
    // }
  },
  async updatePostById(
    id: string,
    post: PostInputType
  ): Promise<PostOutputType | null> {
    // const updatePost: PostOutputType | null =
    await postCollection.updateOne(
      {
        id: id,
      },
      {
        $set: {
          title: post.title,
          shortDescription: post.shortDescription,
          content: post.content,
        },
      }
    );

    const result = await postCollection.findOne({
      id,
    });
    if (!result) {
      return null;
    } else {
      return result;
    }
  },

  async addNewComment(
    newComment: CommentDbType
    // postId: string
  ): Promise<CommentViewModel | null> {
    await commentCollection.insertOne(newComment);

    const result = await commentCollection.findOne({
      id: newComment.id,
    });

    if (result) {
      const resultWithoutMongoId: CommentViewModel = {
        id: result.id,
        content: result.content,
        commentatorInfo: result.commentatorInfo,
        createdAt: result.createdAt,
      };
      console.log("post-db-repository", resultWithoutMongoId);
      return resultWithoutMongoId;
    } else {
      return null;
    }
    // } else {
    //   return null;
    // }
  },
};
