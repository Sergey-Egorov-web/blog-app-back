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
    console.log("authTest1");
    const user: UserDbType = await helperCreateUser(
      "gxPy1H8t75",
      "string123",
      "exa@exam5.com"
    );
    // const accessToken = await jwtService.createJWT(user);
    console.log("authTest2", user.login);
    const responseToken: Response = await request(app)
      .post("/auth/login")
      // .set("Authorization", `Bearer ${accessToken}`)
      .send({
        loginOrEmail: user.login,
        password: user.password,
      })
      .expect(200);
    console.log("authTest3", responseToken.body);
    expect(responseToken.body).toHaveProperty("accessToken");
    expect(typeof responseToken.body.accessToken).toBe("string");

    // console.log(responseToken);
    // expect(responseToken.body).toEqual({
    //   accessToken: expect.any(String), // любое число в качестве id
    //   content: "There are a lot of content must be here",
    //   commentatorInfo: userCommentator,
    //   createdAt: expect.stringMatching(
    //     /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
    //   ),
    // });
  });
});

//_____________________________________________________________________________
