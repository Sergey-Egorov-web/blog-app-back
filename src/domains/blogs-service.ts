import { blogsQueryRepository } from "../repositories/blog-db-query-repository";
import { blogsRepository } from "../repositories/blogs-db-repository";
import { BlogDbType, BlogInputType, BlogOutputType } from "../types";

export const blogsService = {
  // async findAllBlogs(): Promise<BlogDbType[] | null> {
  //   // return blogs;
  //   const result = await blogsRepository.findAllBlogs();

  //   if (result) {
  //     const resultWithoutMongoId = result.map((model) => ({
  //       id: model.id,
  //       name: model.name,
  //       description: model.description,
  //       websiteUrl: model.websiteUrl,
  //       createdAt: model.createdAt,
  //       isMembership: model.isMembership,
  //     }));

  //     return resultWithoutMongoId;
  //   } else {
  //     return null;
  //   }
  // },

  // async findAllBlogs(
  //   pageNumber: number,
  //   pageSize: number,
  //   sortBy: string,
  //   sortDirection: "asc" | "desc",
  //   searchNameTerm: string | null
  // ): Promise<BlogDbType[] | null> {
  //   // return blogs;
  //   const result = await blogsQueryRepository.findAllBlogs(
  //     searchNameTerm,
  //     sortBy,
  //     sortDirection,
  //     pageNumber,
  //     pageSize
  //   );

  //   if (result) {
  //     const resultWithoutMongoId = result.map((model) => ({
  //       id: model.id,
  //       name: model.name,
  //       description: model.description,
  //       websiteUrl: model.websiteUrl,
  //       createdAt: model.createdAt,
  //       isMembership: model.isMembership,
  //     }));

  //     return resultWithoutMongoId;
  //   } else {
  //     return null;
  //   }
  // },
  // async findBlogById(id: string): Promise<BlogOutputType | null> {
  //   const blog: BlogOutputType | null = await blogsQueryRepository.findBlogById(
  //     id
  //   );

  //   if (blog) {
  //     const resultWithoutMongoId: BlogOutputType = {
  //       id: blog.id,
  //       name: blog.name,
  //       description: blog.description,
  //       websiteUrl: blog.websiteUrl,
  //       createdAt: blog.createdAt,
  //       isMembership: blog.isMembership,
  //     };

  //     return resultWithoutMongoId;
  //   } else {
  //     return null;
  //   }
  // },
  async deleteAllBlogs(): Promise<boolean> {
    const result = await blogsRepository.deleteAllBlogs();

    if (result === true) {
      return true;
    } else {
      return false;
    }
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
