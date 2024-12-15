import request, { Response } from "supertest";
import "dotenv/config";

import { app } from "../../src/settings";
import { password, username } from "../../src/configuration";
import {
  helperCreateBlog,
  helperCreatePost,
} from "../helper/helper-create-blog";

describe("/", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
  it("should return 201 and newly created post", async () => {
    // create new post
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
      })
      .expect(201);
    expect(responsePost.body).toEqual({
      id: expect.any(String), // любое число в качестве id
      title: "titleOfNewPost",
      shortDescription: "description of the new post",
      content: "There are a lot of content must be here",
      blogId: blog.id,
      blogName: blog.name,
      createdAt: expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      ),
    });
  });
  //__________________________________________________________________________
  it("should return 200 and object with array of items", async () => {
    // тест на получение всех постов
    const response = await request(app).get("/posts").expect(200);
    expect(response.body).toEqual({
      pagesCount: expect.any(Number), // любое число в качестве количества страниц
      page: expect.any(Number), // любое число в качестве номера страницы
      pageSize: expect.any(Number), // любое число в качестве размера страницы
      totalCount: expect.any(Number), // любое число в качестве количества блогов
      items: expect.any(Array), // пустой массив объектов
    });

    response.body.items.forEach((item: any) => {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          shortDescription: expect.any(String),
          content: expect.any(String),
          blogId: expect.any(String),
          blogName: expect.any(String),
          createdAt: expect.any(String),
        })
      );
    });
  });
  //_____________________________________________________________________________

  it("should return 200 and post", async () => {
    // return post by id
    // const blog = await helperCreateBlog();
    const post = await helperCreatePost();
    const responsePost = await request(app)
      .get(`/posts/${post.id}`)
      .expect(200);
    console.log(`post by id${post.id} ${responsePost.body} `);
    expect(responsePost.body).toEqual({
      id: expect.any(String), // любое число в качестве id
      title: "titleOfNewPost",
      shortDescription: "description of the new post",
      content: "There are a lot of content must be here",
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      ),
    });
  });
  //_____________________________________________________________________________
  it("should return 404 not found", async () => {
    // тест на получение ошибки при поиске поста по несущетсвующему id

    const responsePost = await request(app).get(`/posts/${12345}`).expect(404);
  });
  //_____________________________________________________________________________
  it("should return 200 and post", async () => {
    // Update existing post by id with InputModel
    const blog = await helperCreateBlog();
    const post = await helperCreatePost();
    console.log("post for update", post);
    const updatePost = await request(app)
      .put(`/posts/${post.id}`)
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
      )
      .send({
        title: "updateTitleOfNewPost",
        shortDescription: "updateDescription for TitleOfNewP",
        content: "There are a lot of update content must be here",
        blogId: post.blogId,
      })
      .expect(204);
    console.log(updatePost.body);
    console.log(updatePost.status);
  });
  //_____________________________________________________________________________
});
