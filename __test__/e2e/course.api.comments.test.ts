import request, { Response } from "supertest";
import "dotenv/config";
import { app } from "../../src/settings";
import {
  helperCreateComment,
  helperCreatePost,
  helperCreateUser,
} from "../helper/helper-create-blog";
import {
  CommentatorInfo,
  CommentDbType,
  CommentViewModel,
  PaginatorCommentViewModel,
} from "../../src/types/comment-types";
import { jwtService } from "../../src/application/jwtService";

describe("/", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
  // it("POST COMMENT should return 201 and newly created comment", async () => {
  //   // create new COMMENT

  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t9",
  //     "string123",
  //     "exa@exam.com"
  //   );
  //   const accessToken = await jwtService.createJWT(user);
  //   if (user) {
  //     const userCommentator: CommentatorInfo = {
  //       userId: user.id,
  //       userLogin: user.login,
  //     };
  //     const responseComment: Response = await request(app)
  //       .post(`/posts/${post.id}/comments`)
  //       .set("Authorization", `Bearer ${accessToken}`)
  //       .send({
  //         content: "There are a lot of content must be here",
  //       })
  //       .expect(201);
  //     expect(responseComment.body).toEqual({
  //       id: expect.any(String), // любое число в качестве id
  //       content: "There are a lot of content must be here",
  //       commentatorInfo: userCommentator,
  //       createdAt: expect.stringMatching(
  //         /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
  //       ),
  //     });
  //   }
  // });
  // //___________________________________________________________________________
  // it("POST should return 401 Unauthorized", async () => {
  //   // Unauthorized

  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t9",
  //     "string123",
  //     "exa@exam.com"
  //   );
  //   const accessToken = "token";
  //   if (user) {
  //     const userCommentator: CommentatorInfo = {
  //       userId: user.id,
  //       userLogin: user.login,
  //     };
  //     const responseComment: Response = await request(app)
  //       .post(`/posts/${post.id}/comments`)
  //       .set("Authorization", `Bearer ${accessToken}`)
  //       .send({
  //         content: "There are a lot of content must be here",
  //       })
  //       .expect(401);
  //     // expect(responseComment.body).toEqual({
  //     //   id: expect.any(String), // любое число в качестве id
  //     //   content: "There are a lot of content must be here",
  //     //   commentatorInfo: userCommentator,
  //     //   createdAt: expect.stringMatching(
  //     //     /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
  //     //   ),
  //     // });
  //   }
  // });
  // //___________________________________________________________________________
  // it("POST should return 404 If post with specified postId doesn't exists", async () => {
  //   // don't create new COMMENT

  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser("gxPy1H8t", "string123", "exa@exa.com");
  //   const accessToken = await jwtService.createJWT(user);

  //   if (user) {
  //     const userCommentator: CommentatorInfo = {
  //       userId: user.id,
  //       userLogin: user.login,
  //     };

  //     const responseComment: Response = await request(app)
  //       .post(`/posts/${123}/comments`)
  //       .set("Authorization", `Bearer ${accessToken}`)
  //       .send({
  //         content: "There are a lot of content must be here",
  //       })
  //       .expect(404);
  //   }
  // });
  // //___________________________________________________________________________
  // it("POST COMMENT should return 400 If the inputModel has incorrect values", async () => {
  //   // don't create new COMMENT

  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t8",
  //     "string123",
  //     "exa@exam1.com"
  //   );
  //   const accessToken = await jwtService.createJWT(user);
  //   if (user) {
  //     const userCommentator: CommentatorInfo = {
  //       userId: user.id,
  //       userLogin: user.login,
  //     };
  //     const responseComment: Response = await request(app)
  //       .post(`/posts/${post.id}/comments`)
  //       .set("Authorization", `Bearer ${accessToken}`)
  //       .send({
  //         content: "comment very small",
  //       })
  //       .expect(400);
  //     expect(responseComment.body).toEqual({
  //       errorsMessages: [
  //         {
  //           message: "content length must be between 20 and 300 characters",
  //           field: "content",
  //         },
  //       ],
  //     });
  //   }
  // });
  // //___________________________________________________________________________
  // it("GET should return 200 and comments", async () => {
  //   // return comments for specified post by id
  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t7",
  //     "string1234",
  //     "exa@exam2.com"
  //   );
  //   const comment1: CommentDbType = await helperCreateComment(user, post.id);
  //   const comment2: CommentDbType = await helperCreateComment(user, post.id);
  //   const comment3: CommentDbType = await helperCreateComment(user, post.id);

  //   const response = await request(app)
  //     .get(`/posts/${post.id}/comments`)
  //     .expect(200);
  //   expect(response.body).toEqual({
  //     pagesCount: expect.any(Number), // любое число в качестве количества страниц
  //     page: expect.any(Number), // любое число в качестве номера страницы
  //     pageSize: expect.any(Number), // любое число в качестве размера страницы
  //     totalCount: expect.any(Number), // любое число в качестве количества блогов
  //     items: expect.any(Array), // пустой массив объектов
  //   });

  //   response.body.items.forEach((item: CommentViewModel) => {
  //     expect(item).toEqual(
  //       expect.objectContaining({
  //         id: expect.any(String),
  //         content: expect.any(String),
  //         commentatorInfo: expect.objectContaining({
  //           // Исправлено: ожидаем объект
  //           userId: expect.any(String),
  //           userLogin: expect.any(String),
  //         }),
  //         createdAt: expect.any(String),
  //       })
  //     );
  //   });
  // });
  // //_____________________________________________________________________________
  // it("GET should return 404 post didn't find", async () => {
  //   // return comments for specified post by id
  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t73",
  //     "string1234",
  //     "exa@exam3.com"
  //   );
  //   const comment1: CommentDbType = await helperCreateComment(user, post.id);
  //   const comment2: CommentDbType = await helperCreateComment(user, post.id);
  //   const comment3: CommentDbType = await helperCreateComment(user, post.id);

  //   const response = await request(app)
  //     .get(`/posts/${123}/comments`)
  //     .expect(404);
  // });
  // // _____________________________________________________________________________
  // it("GET should return 200 and comment", async () => {
  //   // return comment by id
  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t74",
  //     "string1234",
  //     "exa@exam4.com"
  //   );

  //   const comment1: CommentDbType = await helperCreateComment(user, post.id);
  //   const comment2: CommentDbType = await helperCreateComment(user, post.id);
  //   const comment3: CommentDbType = await helperCreateComment(user, post.id);

  //   const response = await request(app)
  //     .get(`/comments/${comment1.id}`)
  //     .expect(200);
  //   expect(response.body).toEqual({
  //     id: expect.any(String),
  //     // content: expect.any(String),
  //     content: expect.stringMatching(/.{20,300}/),
  //     commentatorInfo: expect.objectContaining({
  //       userId: expect.any(String),
  //       userLogin: expect.any(String),
  //     }),
  //     createdAt: expect.any(String),
  //   });
  // });
  // //_____________________________________________________________________________
  // it("DELETE should return 204 no content", async () => {
  //   // delete post specified by id
  //   await request(app).delete("/testing/all-data");
  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t78",
  //     "string123",
  //     "exa@exam8.com"
  //   );
  //   console.log("comments.test user1", user);
  //   const comment1: CommentDbType = await helperCreateComment(user, post.id);
  //   console.log("comments.test user1", comment1);
  //   // const comment2: CommentDbType = await helperCreateComment(user, post.id);
  //   // const comment3: CommentDbType = await helperCreateComment(user, post.id);
  //   const accessToken = await jwtService.createJWT(user);
  //   //
  //   const responseComment: Response = await request(app)
  //     .delete(`/comments/${comment1.id}`)
  //     .set("Authorization", `Bearer ${accessToken}`)
  //     .expect(204);
  // });
  // //_____________________________________________________________________________

  // it("DELETE should return 401 Unauthorized", async () => {
  //   // delete post specified by id
  //   // await request(app).delete("/testing/all-data");
  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "gxPy1H8t79",
  //     "string123",
  //     "exa@exam9.com"
  //   );

  //   const comment1: CommentDbType = await helperCreateComment(user, post.id);

  //   // const comment2: CommentDbType = await helperCreateComment(user, post.id);
  //   // const comment3: CommentDbType = await helperCreateComment(user, post.id);
  //   const accessToken = await jwtService.createJWT(user);
  //   //
  //   const responseComment: Response = await request(app)
  //     .delete(`/comments/${comment1.id}`)
  //     .set("Authorization", `Bearer ${125}`)
  //     .expect(401);
  // });
  // //_____________________________________________________________________________
  // it("DELETE should return 403 comment that is not your own", async () => {
  //   // delete post specified by id
  //   await request(app).delete("/testing/all-data");
  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "Py1H8t710",
  //     "string123",
  //     "exa@exam10.com"
  //   );
  //   console.log("commentTest return 403 user1", user);
  //   const user1 = await helperCreateUser(
  //     "gx1H8t711",
  //     "string123",
  //     "exa@exam11.com"
  //   );

  //   const comment1: CommentDbType = await helperCreateComment(user, post.id);

  //   // const comment2: CommentDbType = await helperCreateComment(user, post.id);
  //   // const comment3: CommentDbType = await helperCreateComment(user, post.id);
  //   const accessToken = await jwtService.createJWT(user1);
  //   //
  //   console.log("commentTest return 403", comment1);
  //   const responseComment: Response = await request(app)
  //     .delete(`/comments/${comment1.id}`)
  //     .set("Authorization", `Bearer ${accessToken}`)
  //     .expect(403);
  // });
  // //_____________________________________________________________________________

  // it("DELETE should return 404 comment not found", async () => {
  //   // delete post specified by id
  //   await request(app).delete("/testing/all-data");
  //   const post = await helperCreatePost();
  //   const user = await helperCreateUser(
  //     "Py1H8t710",
  //     "string123",
  //     "exa@exam10.com"
  //   );

  //   const comment1: CommentDbType = await helperCreateComment(user, post.id);

  //   // const comment2: CommentDbType = await helperCreateComment(user, post.id);
  //   // const comment3: CommentDbType = await helperCreateComment(user, post.id);
  //   const accessToken = await jwtService.createJWT(user);

  //   const responseComment: Response = await request(app)
  //     .delete(`/comments/${123}`)
  //     .set("Authorization", `Bearer ${accessToken}`)
  //     .expect(404);
  // });
  //_____________________________________________________________________________
  it("PUT COMMENT should return 204 no content", async () => {
    // update comment by id
    await request(app).delete("/testing/all-data");
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
      const comment: CommentDbType = await helperCreateComment(user, post.id);

      const responseComment: Response = await request(app)
        .put(`/comments/${comment.id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          content: "It is a new content it is wonderful and amazing",
        })
        .expect(204);
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
  it("PUT COMMENT should return 400 bad request", async () => {
    // don't update comment by id
    await request(app).delete("/testing/all-data");
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
      const comment: CommentDbType = await helperCreateComment(user, post.id);
      const responseComment: Response = await request(app)
        .put(`/comments/${comment.id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          content: "It is a new comment",
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
  it("PUT COMMENT should return 400 bad request", async () => {
    // don't update comment by id
    await request(app).delete("/testing/all-data");
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
      const comment: CommentDbType = await helperCreateComment(user, post.id);
      const responseComment: Response = await request(app)
        .put(`/comments/${comment.id}`)
        .set("Authorization", `Bearer ${123}`)
        .send({
          content: "It is a new comment",
        })
        .expect(401);
    }
  });
  //___________________________________________________________________________
  // it("PUT COMMENT should return 403 not found", async () => {
  //   // update comment by id
  //   await request(app).delete("/testing/all-data");
  //   const post = await helperCreatePost();

  //   const user = await helperCreateUser(
  //     "gxPy1H8t9",
  //     "string123",
  //     "exa@exam.com"
  //   );
  //   const user2 = await helperCreateUser(
  //     "Py1H8t91",
  //     "string123",
  //     "exa@exam1.com"
  //   );
  //   const comment: CommentDbType = await helperCreateComment(user, post.id);
  //   console.log("course.api.comments.test1 comment", comment);
  //   const accessToken = await jwtService.createJWT(user);
  //   console.log("course.api.comments.test2 accessToken user", accessToken);
  //   const comment2: CommentDbType = await helperCreateComment(user2, post.id);
  //   console.log("course.api.comments.test2 comment2", comment2);
  //   const accessToken2 = await jwtService.createJWT(user2);
  //   console.log("course.api.comments.test3 accessToken user2", accessToken2);
  //   if (user) {
  //     // const userCommentator: CommentatorInfo = {
  //     //   userId: user.id,
  //     //   userLogin: user.login,
  //     // };

  //     const responseComment: Response = await request(app)
  //       .put(`/comments/${comment2.id}`)
  //       .set("Authorization", `Bearer ${accessToken}`)
  //       .send({
  //         content: "It is a new content it is wonderful and amazing",
  //       })
  //       .expect(403);

  //     // expect(responseComment.body).toEqual({
  //     //   id: expect.any(String), // любое число в качестве id
  //     //   content: "There are a lot of content must be here",
  //     //   commentatorInfo: userCommentator,
  //     //   createdAt: expect.stringMatching(
  //     //     /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
  //     //   ),
  //     // });
  //   }
  // });
  //___________________________________________________________________________
  it("PUT COMMENT should return 404 not FOUND", async () => {
    // update comment by id
    await request(app).delete("/testing/all-data");
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
      const comment: CommentDbType = await helperCreateComment(user, post.id);

      const responseComment: Response = await request(app)
        .put(`/comments/${123}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          content: "It is a new content it is wonderful and amazing",
        })
        .expect(404);
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
});
