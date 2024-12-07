import { blogsQueryRepository } from "../repositories/blog-db-query-repository";
import { postRepository } from "../repositories/posts-db-repository";
import { BlogDbType, PostInputType, PostOutputType } from "../types";
// import { BlogDbType, blogsRepository } from "./blogs-db-repository";
import { blogsService } from "./blogs-service";
// import { postCollection } from "./db";

// export let posts: PostDbType[] = [];

export const postService = {
  // async findAllPosts(): Promise<PostOutputType[] | null> {
  //   const result: PostOutputType[] | null = await postRepository.findAllPosts();

  //   if (result) {
  //     return result;
  //   } else {
  //     return null;
  //   }
  // },
  // async findPostById(id: string): Promise<PostOutputType | null> {
  //   const post: PostOutputType | null = await postRepository.findPostById(id);
  //   if (post) {
  //     return post;
  //   } else {
  //     return null;
  //   }
  // },
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
    // const updatePost: PostOutputType | null =
    const result = await postRepository.updatePostById(id, post);

    // const result = await postCollection.findOne({
    //   id,
    // });
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
