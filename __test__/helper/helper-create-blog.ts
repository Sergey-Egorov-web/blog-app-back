import request, { Response } from "supertest";
import "dotenv/config";

import { app } from "../../src/settings";
import { password, username } from "../../src/configuration";
import { BlogDbType, PostDbType } from "../../src/types";

export const helperCreateBlog = async (): Promise<BlogDbType> => {
  const responseBlog: Response = await request(app)
    .post("/blogs")
    .set(
      "Authorization",
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    )
    .send({
      name: "nameOfNewBlog",
      description: "description of the new blog",
      websiteUrl: "ya-ruru.ru",
    });

  return responseBlog.body;
};

export const helperCreatePost = async (
  blog: BlogDbType
): Promise<PostDbType> => {
  //   const responseBlog = await helperCreateBlog();

  const responsePost: Response = await request(app)
    .post("/posts")
    .set(
      "Authorization",
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    )
    .send({
      title: "titleOfNewPost",
      shortDescription: "description of the new post",
      content: "There are a lot of content must be here",
      blogId: blog.id,
    });

  return responsePost.body;
};
