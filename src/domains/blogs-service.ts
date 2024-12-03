import { blogsRepository } from "../repositories/blogs-db-repository";
import { BlogInputType, BlogOutputType } from "../types";

export type BlogDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export const blogsService = {
  async findAllBlogs(): Promise<BlogDbType[] | null> {
    // return blogs;
    const result = await blogsRepository.findAllBlogs();

    if (result) {
      const resultWithoutMongoId = result.map((model) => ({
        id: model.id,
        name: model.name,
        description: model.description,
        websiteUrl: model.websiteUrl,
        createdAt: model.createdAt,
        isMembership: model.isMembership,
      }));

      return resultWithoutMongoId;
    } else {
      return null;
    }
  },
  async findBlog(id: string): Promise<BlogOutputType | null> {
    const blog: BlogOutputType | null = await blogsRepository.findBlog(id);

    if (blog) {
      const resultWithoutMongoId: BlogOutputType = {
        id: blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
      };

      return resultWithoutMongoId;
    } else {
      return null;
    }
  },
  async deleteAllBlogs(): Promise<boolean> {
    const result = await blogsRepository.deleteAllBlogs();

    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },

  async deleteBlogById(id: string): Promise<boolean> {
    const result = await blogsRepository.deleteBlogById(id);

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  },

  async addNewBlog(blog: BlogInputType): Promise<BlogOutputType | null> {
    const newBlog = {
      id: Date.now().toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    await blogsRepository.addNewBlog(newBlog);

    // return newBlog;

    const result = await blogCollection.findOne({
      id: newBlog.id,
    });

    if (result) {
      const resultWithoutMongoId: BlogOutputType = {
        id: result.id,
        name: result.name,
        description: result.description,
        websiteUrl: result.websiteUrl,
        createdAt: result.createdAt,
        isMembership: result.isMembership,
      };

      return resultWithoutMongoId;
    } else {
      return null;
    }
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
