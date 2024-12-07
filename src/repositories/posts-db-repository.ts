import { PostDbType, PostInputType, PostOutputType } from "../types";

import { postCollection } from "./db";

export const postRepository = {
  // async findAllPosts(): Promise<PostOutputType[] | null> {
  //   const result: PostOutputType[] | null = await postCollection
  //     .find({})
  //     .toArray();

  //   if (result) {
  //     const resultWithoutMongoId: PostOutputType[] | null = result.map(
  //       (post) => ({
  //         id: post.id,
  //         title: post.title,
  //         shortDescription: post.shortDescription,
  //         content: post.content,
  //         blogId: post.blogId,
  //         blogName: post.blogName,
  //         createdAt: post.createdAt,
  //       })
  //     );

  //     return resultWithoutMongoId;
  //   } else {
  //     return null;
  //   }
  // },
  // async findPostById(id: string): Promise<PostOutputType | null> {
  //   const post: PostOutputType | null = await postCollection.findOne({ id });
  //   if (post) {
  //     const resultWithoutMongoId: PostOutputType = {
  //       id: post.id,
  //       title: post.title,
  //       shortDescription: post.shortDescription,
  //       content: post.content,
  //       blogId: post.blogId,
  //       blogName: post.blogName,
  //       createdAt: post.createdAt,
  //     };
  //     return resultWithoutMongoId;
  //   } else {
  //     return null;
  //   }
  // },
  async deleteAllPosts(): Promise<boolean> {
    const result = await postCollection.deleteMany({});
    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },
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
      // updatePost.title = post.title;
      // updatePost.shortDescription = post.shortDescription;
      // updatePost.content = post.content;
      // updatePost.blogId = post.blogId;
      return result;

      // const blog: BlogDbType | null = await blogsRepository.findBlog(
      //   post.blogId
      // );
      // if (blog) {
      //   updatePost.blogName = blog.name;
      //   return updatePost;
      // } else {
      //   return null;
      // }
    }
  },
};
