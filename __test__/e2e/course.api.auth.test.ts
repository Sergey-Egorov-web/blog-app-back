import request, { Response } from "supertest";
import "dotenv/config";
import { app } from "../../src/settings";
import { jwtService } from "../../src/application/jwtService";
import { helperCreateUser } from "../helper/helper-create-blog";
import { UserDbType } from "../../src/types/types";

describe("/", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
  it("POST AUTH/Login should return 200 and JWT token", async () => {
    //
    const password: string = "string123";
    const user: UserDbType = await helperCreateUser(
      "gxPy1H8t75",
      password,
      "exa@exam5.com"
    );

    //
    //
    const responseToken: Response = await request(app)
      .post("/auth/login")

      .send({
        loginOrEmail: user.login,
        password: password,
      })

      .expect(200);
    //
    expect(responseToken.body).toHaveProperty("accessToken");
    expect(typeof responseToken.body.accessToken).toBe("string");
  });
  //_____________________________________________________________________________
  it("POST AUTH/Login should return 400 incorrect values", async () => {
    //
    const password: string = "string123";
    const user: UserDbType = await helperCreateUser("gxPy1H8t76", password, "");

    //
    //
    const responseToken: Response = await request(app)
      .post("/auth/login")

      .send({
        loginOrEmail: user.login,
        password: password,
      })

      .expect(400);
    expect(responseToken.body).toEqual({
      errorsMessages: [
        {
          message: "loginOrEmail can't be empty",
          field: "loginOrEmail",
        },
      ],
    });
  });
  //_____________________________________________________________________________
  it("POST AUTH/Login should return 401 Unauthorized", async () => {
    //
    const password: string = "string123";
    const user: UserDbType = await helperCreateUser(
      "gxPy1H8t77",
      password,
      "exa@exam7.com"
    );

    //
    //
    const responseToken: Response = await request(app)
      .post("/auth/login")

      .send({
        loginOrEmail: user.login,
        password: 1256718,
      })

      .expect(401);
    //
  });
  //_____________________________________________________________________________
});
