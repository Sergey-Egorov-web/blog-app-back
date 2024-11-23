import request, { Response } from "supertest";

import { app } from "../../src/settings";
import { Blog } from "../../src/repositories/blogs-repository";
// import { response } from "express";

describe("/", () => {
  it("should return 200 and empty array", () => {
    expect(1).toBe(1);
  });
});

describe("/blogs", () => {
  beforeAll(async () => {
    await request(app).delete("/blogs/testing/all-data");
  });
  it("should return 200 and empty array", async () => {
    await request(app).get("/blogs").expect(200, []);
  });

  it("should return 201 and newly created blog", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "nameOfNewBlog",
        description: "description of the new blog",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(201);
    expect(response.body).toEqual({
      id: expect.any(Number), // Ожидаем любое число в качестве id
      name: "nameOfNewBlog",
      description: "description of the new blog",
      websiteUrl: "fdsfkdfkdsf@fdffd.ru",
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "",
        description: "description of the new blog",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          msg: "name can't be empty",
          path: "name",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "dsfdsfsdflsdf'dslf'sdlfs'dflsd'\f",
        description: "description of the new blog",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          msg: "name length must be between 3 and 15 characters",
          path: "name",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "blog name",
        description: "",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          msg: "description can't be empty",
          path: "description",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "name of blog",
        description: "de",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          msg: "description length must be between 10 and 500 characters",
          path: "description",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "blog name",
        description: "it is description of the blog",
        websiteUrl: "",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          msg: "websiteUrl can't be empty",
          path: "websiteUrl",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "name of blog",
        description: "it is description of the blog",
        websiteUrl: "fdsfkdfkdsf@fdffru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          msg: "field url must be Url",
          path: "websiteUrl",
        },
      ],
    });
  });

  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .send({
        name: "",
        description: "it is ",
        websiteUrl: "fdsfkdfkdsf@fdffru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          msg: "name can't be empty",
          path: "name",
        },
        {
          msg: "description length must be between 10 and 500 characters",
          path: "description",
        },
        {
          msg: "field url must be Url",
          path: "websiteUrl",
        },
      ],
    });
  });
});
