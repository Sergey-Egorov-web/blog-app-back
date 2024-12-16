import request, { Response } from "supertest";
import "dotenv/config";

import { app } from "../../src/settings";
import { password, username } from "../../src/configuration";
import {
  helperCreateBlog,
  helperCreatePost,
  helperCreateUser,
} from "../helper/helper-create-blog";

describe("/", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
  it("POST should return 201 and newly created user", async () => {
    // Add new user to the system
    const responseUser: Response = await request(app)
      .post("/users")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
      )
      .send({
        login: "QmWgxPy1H8",
        password: "string",
        email: "example@example.com",
      })
      .expect(201);
    expect(responseUser.body).toEqual({
      id: expect.any(String), // любое число в качестве id
      login: "QmWgxPy1H8",
      email: "example@example.com",
      createdAt: expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      ),
    });
  });
  //_____________________________________________________________________________
  it("POST should return 400 inputModel has incorrect values", async () => {
    // 	RETURN 400 If the inputModel has incorrect values.

    const responseUser: Response = await request(app)
      .post("/users")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
      )
      .send({
        login: "QmWgxPy1H8",
        password: "",
        email: "example@example.com",
      })
      .expect(400);
    expect(responseUser.body).toEqual({
      errorsMessages: [
        {
          message: "password can't be empty",
          field: "password",
        },
      ],
    });
  });
  //_____________________________________________________________________________
  it("POST should return 400 inputModel has incorrect values", async () => {
    // 	RETURN 400 If the inputModel has incorrect values (email isn't unique).
    const user = await helperCreateUser();
    console.log(user.email);
    const responseUser: Response = await request(app)
      .post("/users")
      .set(
        "Authorization",
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
      )
      .send({
        login: "QmWgxPy1",
        password: "string123",
        email: user.email,
      })
      .expect(400);
    // console.log(responseUser.body.email);
    expect(responseUser.body).toEqual({
      errorsMessages: [
        {
          message: "email must be unique",
          field: "email",
        },
      ],
    });
  });
  //_____________________________________________________________________________
});
