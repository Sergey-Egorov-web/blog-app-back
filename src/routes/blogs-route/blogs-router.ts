import express, { NextFunction, Request, Response, Router } from "express";
import { blogsRepository } from "../../repositories/blogs-db-repository";
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

blogsRouter.get("/", ITINCUBATOR, async (req: Request, res: Response) => {
  const allBlogs = await blogsRepository.findAllBlogs();

  res.status(200).send(allBlogs);
});
//TODO вынести
// blogsRouter.delete("/testing/all-data", async (req: Request, res: Response) => {
//   await blogsRepository.deleteAllBlogs();
//   res.send(204);
// });

blogsRouter.post(
  "/",
  basicAuthorizationMiddleware,
  nameValidation(),
  descriptionValidation(),
  webSiteUrlValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const blogCreateData: BlogInputType = req.body;
    const newBlog: BlogOutputType | null = await blogsRepository.addNewBlog(
      blogCreateData
    );

    res.status(201).send(newBlog);
  }
);

blogsRouter.put(
  "/:id",
  basicAuthorizationMiddleware,
  nameValidation(),
  descriptionValidation(),
  webSiteUrlValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const blogUpdateData: BlogInputType = req.body;
    const updateBlog = await blogsRepository.updateBlogById(blogUpdateData, id);
    if (updateBlog) {
      res.status(204).send(updateBlog);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  let blog = await blogsRepository.findBlog(id);
  if (blog) {
    res.send(blog);
  } else res.send(404);
});

blogsRouter.delete(
  "/:id",
  basicAuthorizationMiddleware,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const answer = await blogsRepository.deleteBlogById(id);
    if (answer === true) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
