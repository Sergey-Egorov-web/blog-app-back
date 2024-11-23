import express, { NextFunction, Request, Response, Router } from "express";
import { blogsRepository } from "../../repositories/blogs-repository";
import { body, validationResult } from "express-validator";

import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";

export const blogsRouter = Router({});

// blogsRouter.use(express.json());

const ITINCUBATOR = (req: Request, res: Response, next: NextFunction): void => {
  console.log("IT-INCUBATOR");
  next();
};

blogsRouter.use(ITINCUBATOR);

blogsRouter.get("/", ITINCUBATOR, (req: Request, res: Response) => {
  const allBlogs = blogsRepository.findAllBlogs();
  // res.send(allBlogs);
  res.status(200).send(allBlogs);
});
//TODO вынести
blogsRouter.delete("/testing/all-data", (req: Request, res: Response) => {
  blogsRepository.deleteAllBlogs();
  res.send(204);
});

function nameValidation() {
  return body("name")
    .trim()
    .notEmpty()
    .withMessage("name can't be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("name length must be between 3 and 15 characters");
}

const descriptionValidation = () => {
  return body("description")
    .trim()
    .notEmpty()
    .withMessage("description can't be empty")
    .isLength({ min: 10, max: 500 })
    .withMessage("description length must be between 10 and 500 characters");
};

const webSiteUrlValidation = () => {
  return body("websiteUrl")
    .trim()
    .notEmpty()
    .withMessage("websiteUrl can't be empty")
    .isURL()
    .withMessage("field url must be Url")
    .isLength({ min: 3, max: 100 })
    .withMessage("websiteUrl length must be between 3 and 100 characters");
};

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

export type BlogOutputType = {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
};

export type BlogInputType = {
  name: string;
  description: string;
  websiteUrl: string;
};
