import express, { NextFunction, Request, Response, Router } from "express";

export const postsRouter = Router({});

import { PostInputType, PostOutputType } from "../../types";
import { postRepositories } from "../../repositories/posts-repository";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { titlePostValidation } from "../../middlewares/title-post-validation";
import { shortDescriptionPostValidation } from "../../middlewares/short-description-post-validation";
import { contentPostValidation } from "../../middlewares/content-post-validation";
import { blogIdPostValidation } from "../../middlewares/blogId-post-validation";

postsRouter.get("/", (req: Request, res: Response) => {
  const allPosts = postRepositories.findAllPosts();

  res.status(200).send(allPosts);
});

postsRouter.post(
  "/",
  basicAuthorizationMiddleware,
  titlePostValidation(),
  shortDescriptionPostValidation(),
  contentPostValidation(),
  blogIdPostValidation(),
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const postCreateData: PostInputType = req.body;
    // const newBlog: PostOutputType | undefined =
    postRepositories.addNewPost(postCreateData);

    res.sendStatus(204);
  }
);
