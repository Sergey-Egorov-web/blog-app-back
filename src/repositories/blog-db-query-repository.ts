import { BlogDbType, BlogOutputType, PostOutputType } from "../types";
import { blogCollection, postCollection } from "./db";

export const blogsQueryRepository = {
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

  async findAllPostsByBlogId(
    blogId: string,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: "asc" | "desc",
    searchNameTerm: string | null
  ): Promise<PostOutputType[] | null> {
    const filter: any = {};
    // console.log(`BlogId ${blogId}`);
    const result: PostOutputType[] = [];

    if (searchNameTerm) {
      filter.title = { $regex: searchNameTerm, $options: "i" };
    }
    const foundPosts = await postCollection
      // .find({})
      .find({ blogId })
      .sort({ [sortBy]: sortDirection === "asc" ? "desc" : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    // console.log(`foundPosts: ${JSON.stringify(foundPosts)}`);

    if (foundPosts) {
      return foundPosts;
    } else {
      return null;
    }
  },
};
