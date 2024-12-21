import request, { Response } from "supertest";
import "dotenv/config";

import { app } from "../../src/settings";
import { password, username } from "../../src/configuration";
import {
  helperCreateBlog,
  helperCreatePost,
  helperCreateToken,
  helperCreateUser,
} from "../helper/helper-create-blog";
import { CommentatorInfo } from "../../src/types/comment-types";
import { jwtService } from "../../src/application/jwtService";

describe("/", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
  it("COMMENT should return 201 and newly created comment", async () => {
    // create new COMMENT

    const post = await helperCreatePost();
    const user = await helperCreateUser();
    console.log("commentTest", user);
    // const accessToken = await helperCreateToken(user.login, user.password);
    const accessToken = await jwtService.createJWT(user);
    console.log("commentTest", accessToken);

    if (user) {
      const userCommentator: CommentatorInfo = {
        userId: user.id,
        userLogin: user.login,
      };

      const responseComment: Response = await request(app)
        .post(`/posts/${post.id}/comments`)
        .set(
          "Authorization",

          `Bearer ${accessToken}`
        )

        .send({
          content: "There are a lot of content must be here",
        })
        .expect(201);
      expect(responseComment.body).toEqual({
        id: expect.any(String), // любое число в качестве id
        content: "There are a lot of content must be here",
        commentatorInfo: userCommentator,
        createdAt: expect.stringMatching(
          /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
        ),
      });
    }
  });
});
