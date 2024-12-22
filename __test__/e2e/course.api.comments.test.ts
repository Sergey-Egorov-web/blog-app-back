import request, { Response } from "supertest";
import "dotenv/config";
import { app } from "../../src/settings";
import {
  helperCreatePost,
  helperCreateUser,
} from "../helper/helper-create-blog";
import { CommentatorInfo } from "../../src/types/comment-types";
import { jwtService } from "../../src/application/jwtService";
import { faker } from "@faker-js/faker";
describe("/", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
  it("POST COMMENT should return 201 and newly created comment", async () => {
    // create new COMMENT

    const post = await helperCreatePost();
    const user = await helperCreateUser(
      "gxPy1H8t9",
      "string123",
      "exa@exam.com"
    );
    const accessToken = await jwtService.createJWT(user);
    if (user) {
      const userCommentator: CommentatorInfo = {
        userId: user.id,
        userLogin: user.login,
      };
      const responseComment: Response = await request(app)
        .post(`/posts/${post.id}/comments`)
        .set("Authorization", `Bearer ${accessToken}`)
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
  //___________________________________________________________________________
  it("POST should return 401 Unauthorized", async () => {
    // Unauthorized

    const post = await helperCreatePost();
    const user = await helperCreateUser(
      "gxPy1H8t9",
      "string123",
      "exa@exam.com"
    );
    const accessToken = "token";
    if (user) {
      const userCommentator: CommentatorInfo = {
        userId: user.id,
        userLogin: user.login,
      };
      const responseComment: Response = await request(app)
        .post(`/posts/${post.id}/comments`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          content: "There are a lot of content must be here",
        })
        .expect(401);
      // expect(responseComment.body).toEqual({
      //   id: expect.any(String), // любое число в качестве id
      //   content: "There are a lot of content must be here",
      //   commentatorInfo: userCommentator,
      //   createdAt: expect.stringMatching(
      //     /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      //   ),
      // });
    }
  });
  //___________________________________________________________________________
  it("POST should return 404 If post with specified postId doesn't exists", async () => {
    // don't create new COMMENT

    const post = await helperCreatePost();
    const user = await helperCreateUser("gxPy1H8t", "string123", "exa@exa.com");
    const accessToken = await jwtService.createJWT(user);
    console.log("POST should return 404", accessToken);
    if (user) {
      const userCommentator: CommentatorInfo = {
        userId: user.id,
        userLogin: user.login,
      };

      const responseComment: Response = await request(app)
        .post(`/posts/${123}/comments`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          content: "There are a lot of content must be here",
        })
        .expect(404);
    }
  });
  //___________________________________________________________________________
  it("POST COMMENT should return 400 If the inputModel has incorrect values", async () => {
    // don't create new COMMENT

    const post = await helperCreatePost();
    const user = await helperCreateUser(
      "gxPy1H8t8",
      "string123",
      "exa@exam1.com"
    );
    const accessToken = await jwtService.createJWT(user);
    if (user) {
      const userCommentator: CommentatorInfo = {
        userId: user.id,
        userLogin: user.login,
      };
      const responseComment: Response = await request(app)
        .post(`/posts/${post.id}/comments`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          content: "comment very small",
        })
        .expect(400);
      expect(responseComment.body).toEqual({
        errorsMessages: [
          {
            message: "content length must be between 20 and 300 characters",
            field: "content",
          },
        ],
      });
    }
  });
  //___________________________________________________________________________
});
