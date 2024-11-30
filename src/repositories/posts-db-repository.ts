import { PostInputType, PostOutputType } from "../types";
import { BlogDbType, blogsRepository } from "./blogs-db-repository";
import { client } from "./db";

export type PostDbType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export let posts: PostDbType[] = [
  //   {
  //     id: "1",
  //     title: "firstPost",
  //     shortDescription: "it is small description",
  //     content: "we will make a lot of content today and i the future",
  //     blogId: "1",
  //     blogName: "myBlog",
  //   },
  //   {
  //     id: "2",
  //     title: "firstPost",
  //     shortDescription: "it is small description",
  //     content: "we will make a lot of content today and i the future",
  //     blogId: "2",
  //     blogName: "denBlog",
  //   },
];

export const postRepositories = {
  async findAllPosts(): Promise<PostDbType[] | null> {
    return await client
      .db("BloggerPlatform")
      .collection<PostDbType>("posts")
      .find({})
      .toArray();
  },
  async findPost(id: string): Promise<PostOutputType | null> {
    let post: PostOutputType | null = await client
      .db("BloggerPlatform")
      .collection<PostOutputType>("posts")
      .findOne({ id });
    if (post) {
      return post;
    } else {
      return null;
    }
  },
  async deleteAllPosts(): Promise<boolean> {
    const result = await client
      .db("BloggerPlatform")
      .collection<PostOutputType>("posts")
      .deleteMany({});
    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },
  async deletePostById(id: string): Promise<boolean> {
    const result = await client
      .db("BloggerPlatform")
      .collection<PostOutputType>("posts")
      .deleteOne({ id: id });
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  },
  async addNewPost(post: PostInputType): Promise<PostOutputType | null> {
    const blog: BlogDbType | null = await blogsRepository.findBlog(post.blogId);

    if (blog) {
      const newPost: PostOutputType | null = {
        id: Date.now().toString(),

        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: blog.id,
        blogName: blog.name,
        createdAt: new Date().toISOString(),
      };
      await client
        .db("BloggerPlatform")
        .collection<PostOutputType>("blogs")
        .insertOne(newPost);
      return newPost;
    } else {
      return null;
    }
  },
  async updatePostById(
    post: PostInputType,
    id: string
  ): Promise<PostOutputType | undefined> {
    let updatePost = posts.find((p) => p.id === id);
    if (updatePost) {
      updatePost.title = post.title;
      updatePost.shortDescription = post.shortDescription;
      updatePost.content = post.content;
      updatePost.blogId = post.blogId;

      const blog: BlogDbType | null = await blogsRepository.findBlog(
        post.blogId
      );
      if (blog) {
        updatePost.blogName = blog.name;
        return updatePost;
      }
    } else {
      return undefined;
    }
  },
};
