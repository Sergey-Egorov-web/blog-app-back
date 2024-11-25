import express, { NextFunction, Request, Response, Router } from "express";

export const postsRouter = Router({});

import { BlogInputType, BlogOutputType } from "../../types";
import { postRepositories } from "../../repositories/posts-repository";

postsRouter.get("/", (req: Request, res: Response) => {
  const allPosts = postRepositories.findAllPosts();

  res.status(200).send(allPosts);
});
