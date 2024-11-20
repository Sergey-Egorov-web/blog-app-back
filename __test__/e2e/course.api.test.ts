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
});
