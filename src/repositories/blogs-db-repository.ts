import { BlogDbType, BlogInputType, BlogOutputType } from "../types/types";
import { blogCollection } from "./db";

export const blogsRepository = {
  async deleteAllBlogs(): Promise<boolean> {
    const result = await blogCollection.deleteMany({});

    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  },

  async deleteBlogById(id: string): Promise<boolean> {
    const result = await blogCollection.deleteOne({ id });
    console.log(result.deletedCount);
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
