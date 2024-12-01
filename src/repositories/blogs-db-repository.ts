import { BlogInputType, BlogOutputType } from "../types";
import { blogCollection } from "./db";

export type BlogDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export const blogsRepository = {
  async findAllBlogs(): Promise<BlogDbType[] | null> {
    // return blogs;
    return await blogCollection.find({}).toArray();
  },
  async findBlog(id: string): Promise<BlogOutputType | null> {
    const blog: BlogOutputType | null = await blogCollection.findOne({ id });

    // let blog = blogs.find((p) => p.id === id);
    if (blog) {
      return blog;
    } else {
      return null;
    }
  },
  async deleteAllBlogs(): Promise<boolean> {
    const result = await blogCollection.deleteMany({});

    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },

  async deleteBlogById(id: string): Promise<boolean> {
    const result = await blogCollection.deleteOne({ id: id });

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

    await blogCollection.insertOne(newBlog);

    return newBlog;
  },

  async updateBlogById(
    blog: BlogInputType,
    id: string
  ): Promise<BlogOutputType | null> {
    const result = await blogCollection.updateOne(
      { id: id },
      {
        $set: {
          name: blog.name,
          description: blog.description,
          websiteUrl: blog.websiteUrl,
        },
      }
    );

    let updateBlog = await blogCollection.findOne({ id });
    if (updateBlog) {
      return updateBlog;
    } else {
      return null;
    }
  },
};
