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
  async (req: Request, res: Response) => {
    const postCreateData: PostInputType = req.body;
    const newPost: PostOutputType | null = await postRepositories.addNewPost(
      postCreateData
    );

    if (newPost) {
      res.status(201).send(newPost);
    }
    // else {
    //   res.status(404).send("Blog not found");
    // }
  }
);

postsRouter.get("/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  let post = postRepositories.findPost(id);
  if (post) {
    res.send(post);
  } else res.send(404);
});

postsRouter.delete(
  "/:id",
  basicAuthorizationMiddleware,
  (req: Request, res: Response) => {
    const id: string = req.params.id;
    const answer = postRepositories.deletePostById(id);
    if (answer === true) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

postsRouter.put(
  "/:id",
  basicAuthorizationMiddleware,
  titlePostValidation(),
  shortDescriptionPostValidation(),
  contentPostValidation(),
  blogIdPostValidation(),
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const id: string = req.params.id;
    const postUpdateData: PostInputType = req.body;
    const updatePost = postRepositories.updatePostById(postUpdateData, id);
    if (updatePost) {
      res.status(204).send(updatePost);
    } else {
      res.sendStatus(404);
    }
  }
);
