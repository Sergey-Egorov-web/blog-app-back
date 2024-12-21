import request, { Response } from "supertest";
import "dotenv/config";

import { app } from "../../src/settings";
import { password, username } from "../../src/configuration";
import {
  BlogDbType,
  PostDbType,
  UserDbType,
  UserInputModel,
} from "../../src/types/types";
import { faker } from "@faker-js/faker";
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

  return responsePost.body;
};

export const helperCreateUser = async (
  userLogin: string,
  userPassword: string,
  userEmail: string
): Promise<UserDbType> => {
  const user: UserInputModel = {
    // login: "gxPy1H8t9",
    // password: "string123",
    // email: "exa@exam.com",
    login: userLogin,
    password: userPassword,
    email: userEmail,
  };

  const responseUser: Response = await request(app)
    .post("/users")
    .set(
      "Authorization",
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    )
    .send(user);

  return responseUser.body;
};
