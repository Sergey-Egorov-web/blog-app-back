import express, { NextFunction, Request, Response, Router } from "express";

export const postsRouter = Router({});

import { PostInputType, PostOutputType } from "../../types";
import { postRepositories } from "../../repositories/posts-db-repository";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { titlePostValidation } from "../../middlewares/title-post-validation";
import { shortDescriptionPostValidation } from "../../middlewares/short-description-post-validation";
import { contentPostValidation } from "../../middlewares/content-post-validation";
import { blogIdPostValidation } from "../../middlewares/blogId-post-validation";
import { postService } from "../../domains/posts-service";

postsRouter.get("/", async (req: Request, res: Response) => {
  const allPosts = await postRepositories.findAllPosts();

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
    const newPost: PostOutputType | null = await postService.addNewPost(
      postCreateData
    );

    if (newPost) {
      res.status(201).send(newPost);
    } else {
      res.status(404).send("Blog not found");
    }
  }
);

postsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  let post = await postService.findPostById(id);
  if (post) {
    res.send(post);
  } else res.send(404);
});

postsRouter.delete(
  "/:id",
  basicAuthorizationMiddleware,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const answer = await postService.deletePostById(id);
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
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const postUpdateData: PostInputType = req.body;
    const updatePost = await postService.updatePostById(id, postUpdateData);
    if (updatePost) {
      res.status(204).send(updatePost);
    } else {
      res.sendStatus(404);
    }
  }
);
