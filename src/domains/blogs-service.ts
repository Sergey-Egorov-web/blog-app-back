import { blogsQueryRepository } from "../repositories/blog-db-query-repository";
import { blogsRepository } from "../repositories/blogs-db-repository";
import { BlogDbType, BlogInputType, BlogOutputType } from "../types/types";

export const blogsService = {
  async deleteAllBlogs(): Promise<boolean> {
    const result = await blogsRepository.deleteAllBlogs();

    return result;
    // if (result === true) {
    //   return true;
    // } else {
    //   return false;
    // }
  },

  async deleteBlogById(id: string): Promise<boolean> {
    const result: boolean = await blogsRepository.deleteBlogById(id);
    console.log(result);
    if (result === true) {
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

    const result = await blogsQueryRepository.findBlogById(newBlog.id);

    if (result) {
      return result;
    } else {
      return null;
    }
  },

  async updateBlogById(
    blog: BlogInputType,
    id: string
  ): Promise<BlogOutputType | null> {
    const result = await blogsRepository.updateBlogById(
      id,
      blog
      // {
      //   $set: {
      //     name: blog.name,
      //     description: blog.description,
      //     websiteUrl: blog.websiteUrl,
      //   },
      // }
    );

    let updateBlog = await blogsQueryRepository.findBlogById(id);
    if (updateBlog) {
      return updateBlog;
    } else {
      return null;
    }
  },
};
