import request, { Response } from "supertest";
import "dotenv/config";

import { app } from "../../src/settings";
import { password, username } from "../../src/configuration";
import { BlogDbType, PostDbType, UserDbType } from "../../src/types";

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

export const helperCreatePost = async (): Promise<PostDbType> => {
  const blog = await helperCreateBlog();
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
  // console.log(responsePost.body);
  return responsePost.body;
};

export const helperCreateUser = async (): Promise<UserDbType> => {
  // const blog = await helperCreateBlog();
  const responseUser: Response = await request(app)
    .post("/users")
    .set(
      "Authorization",
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    )
    .send({
      login: "gxPy1H8t9",
      password: "string123",
      email: "exa@exam.com",
    });
  console.log(responseUser.body);
  return responseUser.body;
};
