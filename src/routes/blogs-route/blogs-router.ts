import express, { NextFunction, Request, Response, Router } from "express";
import { blogs, blogsRepository } from "../../repositories/blogs-repository";
import { body, validationResult } from "express-validator";

import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";

import { descriptionValidation } from "../../middlewares/description-validation";
import { webSiteUrlValidation } from "../../middlewares/webSiteUrl-validation";
import { BlogInputType, BlogOutputType } from "../../types";
import { nameValidation } from "../../middlewares/name-validation";

export const blogsRouter = Router({});

// blogsRouter.use(express.json());

const ITINCUBATOR = (req: Request, res: Response, next: NextFunction): void => {
  console.log("IT-INCUBATOR");
  next();
};

blogsRouter.use(ITINCUBATOR);

blogsRouter.get("/", ITINCUBATOR, (req: Request, res: Response) => {
  const allBlogs = blogsRepository.findAllBlogs();

  res.status(200).send(allBlogs);
});
//TODO вынести
blogsRouter.delete("/testing/all-data", (req: Request, res: Response) => {
  blogsRepository.deleteAllBlogs();
  res.send(204);
});

blogsRouter.post(
  "/",
  basicAuthorizationMiddleware,
  nameValidation(),
  descriptionValidation(),
  webSiteUrlValidation(),
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const blogCreateData: BlogInputType = req.body;
    const newBlog: BlogOutputType = blogsRepository.addNewBlog(blogCreateData);

    res.status(201).send(newBlog);
  }
);

blogsRouter.get("/:id", (req: Request, res: Response) => {
  const id: Number = +req.params.id;
  let blog = blogsRepository.findBlog(id);
  if (blog) {
    res.send(blog);
  } else res.send(404);
});
