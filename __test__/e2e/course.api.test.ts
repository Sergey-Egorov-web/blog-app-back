import request, { Response } from "supertest";

import { app } from "../../src/settings";
// import { Blog } from "../../src/repositories/blogs-repository";
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

  //__________________________________________________________________________________
  //   it("should return 204 no content", async () => {
  //     const response: Response = await request(app)
  //       .post("/blogs")
  //       .set(
  //         "Authorization",
  //         "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
  //       )
  //       .send({
  //         name: "nameOfNewBlog",
  //         description: "description of the new blog",
  //         websiteUrl: "ya-ruru.ru",
  //       })
  // //______________________________________________________________________________________
  it("should return 201 and newly created blog", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )

      .send({
        name: "nameOfNewBlog",
        description: "description of the new blog",
        websiteUrl: "ya-ruru.ru",
      })
      .expect(204);
    expect(response.body).toEqual({
      id: expect.any(Number), // любое число в качестве id
      name: "nameOfNewBlog",
      description: "description of the new blog",
      websiteUrl: "ya-ruru.ru",
    });
  });

  it("it should return 401 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")

      .send({
        name: "Dmitrov",
        description: "description of the new blog",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(401);
  });

  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )
      .send({
        name: "",
        description: "description of the new blog",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "name can't be empty",
          field: "name",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )
      .send({
        name: "dsfdsfsdflsdf'dslf'sdlfs'dflsd'\f",
        description: "description of the new blog",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "name length must be between 3 and 15 characters",
          field: "name",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )
      .send({
        name: "blog name",
        description: "",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "description can't be empty",
          field: "description",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )
      .send({
        name: "name of blog",
        description: "de",
        websiteUrl: "fdsfkdfkdsf@fdffd.ru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "description length must be between 10 and 500 characters",
          field: "description",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )
      .send({
        name: "blog name",
        description: "it is description of the blog",
        websiteUrl: "",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "websiteUrl can't be empty",
          field: "websiteUrl",
        },
      ],
    });
  });
  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )
      .send({
        name: "name of blog",
        description: "it is description of the blog",
        websiteUrl: "fdsfkdfkdsf@fdffru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "field url must be Url",
          field: "websiteUrl",
        },
      ],
    });
  });

  it("it should return 400 and next errors", async () => {
    const response: Response = await request(app)
      .post("/blogs")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64")
      )
      .send({
        name: "",
        description: "it is ",
        websiteUrl: "fdsfkdfkdsf@fdffru",
      })
      .expect(400);
    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: "name can't be empty",
          field: "name",
        },
        {
          message: "description length must be between 10 and 500 characters",
          field: "description",
        },
        {
          message: "field url must be Url",
          field: "websiteUrl",
        },
      ],
    });
  });
});
