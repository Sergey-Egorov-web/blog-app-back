import { BlogDbType, BlogInputType, BlogOutputType } from "../types";
import { blogCollection } from "./db";

export const blogsRepository = {
  async findAllBlogs(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: "asc" | "desc",
    searchNameTerm: string | null
  ): Promise<BlogDbType[] | null> {
    const filter: any = {};

    if (searchNameTerm) {
      filter.title = { $regex: searchNameTerm, $option: "i" };
    }
    const result = await blogCollection
      .find({ filter })
      .sort({ [sortBy]: sortDirection === "asc" ? "desc" : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return result;
  },
  async findBlog(id: string): Promise<BlogOutputType | null> {
    const blog: BlogOutputType | null = await blogCollection.findOne({ id });

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

  async addNewBlog(newBlog: BlogDbType): Promise<BlogOutputType | null> {
    // const newBlog = {
    //   id: Date.now().toString(),
    //   name: blog.name,
    //   description: blog.description,
    //   websiteUrl: blog.websiteUrl,
    //   createdAt: new Date().toISOString(),
    //   isMembership: false,
    // };

    await blogCollection.insertOne(newBlog);

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
    id: string,
    blog: BlogInputType
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
