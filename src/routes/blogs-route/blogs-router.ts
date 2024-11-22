import express, { NextFunction, Request, Response, Router } from "express";
import { blogsRepository } from "../../repositories/blogs-repository";
import { body, validationResult } from "express-validator";
import { request } from "http";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";

export const blogsRouter = Router({});

const ITINCUBATOR = (req: Request, res: Response, next: NextFunction): void => {
  console.log("IT-INCUBATOR");
  next();
};

blogsRouter.use(express.json());
blogsRouter.use(ITINCUBATOR);

blogsRouter.get("/", ITINCUBATOR, (req: Request, res: Response) => {
  const allBlogs = blogsRepository.findAllBlogs();
  // res.send(allBlogs);
  res.status(200).send(allBlogs);
});

blogsRouter.delete("/testing/all-data", (req: Request, res: Response) => {
  blogsRepository.deleteAllBlogs();
  res.send(204);
});

function nameValidation(min: number, max: number) {
  return body("name")
    .trim()
    .notEmpty()
    .withMessage("Name can't be empty")
    .isLength({ min: min, max: max })
    .withMessage("Name length must be between 3 and 15 characters");
}

const descriptionValidation = () => {
  return body("description")
    .trim()
    .notEmpty()
    .withMessage("description can't be empty")
    .isLength({ min: 10, max: 500 })
    .withMessage("description length must be between 3 and 500 characters");
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
  nameValidation(3, 15),
  descriptionValidation(),
  webSiteUrlValidation(),
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const newBlog = blogsRepository.addNewBlog(req.body);

    res.status(201).send(newBlog);
  }
);
