import { ObjectId } from "mongodb";
import { BlogInputType, BlogOutputType } from "../types";
import { client } from "./db";
import { time } from "console";

export type BlogDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

// удалить массив blogs так как работаем с db

// export let blogs: BlogDbType[] = [
// {
//   id: "1",
//   name: "myBlog",
//   description: "blog about me",
//   websiteUrl: "aboutme@yandex.ru",
// },
// {
//   id: "2",
//   name: "denBlog",
//   description: "blog about Den",
//   websiteUrl: "den@yandex.ru",
// },
// ];

export const blogsRepository = {
  async findAllBlogs(): Promise<BlogDbType[] | null> {
    // return blogs;
    return client
      .db("BloggerPlatform")
      .collection<BlogDbType>("blogs")
      .find({})
      .toArray();
  },
  async findBlog(id: string): Promise<BlogOutputType | null> {
    let blog: BlogOutputType | null = await client
      .db("BloggerPlatform")
      .collection<BlogOutputType>("blogs")
      .findOne({ id });

    // let blog = blogs.find((p) => p.id === id);
    if (blog) {
      return blog;
    } else {
      return null;
    }
  },
  async deleteAllBlogs(): Promise<boolean> {
    const result = await client
      .db("BloggerPlatform")
      .collection("blogs")
      .deleteMany({});

    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },

  async deleteBlogById(id: string): Promise<boolean> {
    const result = await client
      .db("BloggerPlatform")
      .collection<BlogOutputType>("blogs")
      .deleteOne({ id: id });

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  },

  async addNewBlog(blog: BlogInputType): Promise<BlogOutputType> {
    const newBlog = {
      id: Date.now().toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    await client
      .db("BloggerPlatform")
      .collection<BlogOutputType>("blogs")
      .insertOne(newBlog);

    return newBlog;
  },

  async updateBlogById(
    blog: BlogInputType,
    id: string
  ): Promise<BlogOutputType | null> {
    const result = await client
      .db("BloggerPlatform")
      .collection<BlogOutputType>("blogs")
      .updateOne(
        { id: id },
        {
          $set: {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
          },
        }
      );

    let updateBlog = await client
      .db("BloggerPlatform")
      .collection<BlogOutputType>("blogs")
      .findOne({ id });
    if (updateBlog) {
      return updateBlog;
    } else {
      return null;
    }
  },
};
