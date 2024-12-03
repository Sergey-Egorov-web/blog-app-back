import express, { NextFunction, Request, Response, Router } from "express";
import { blogsRepository } from "../../repositories/blogs-db-repository";
import { body, validationResult } from "express-validator";

import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";

import { descriptionValidation } from "../../middlewares/description-validation";
import { webSiteUrlValidation } from "../../middlewares/webSiteUrl-validation";
import { BlogInputType, BlogOutputType } from "../../types";
import { nameValidation } from "../../middlewares/name-validation";
import { blogsService } from "../../domains/blogs-service";

export const blogsRouter = Router({});

// blogsRouter.use(express.json());

const ITINCUBATOR = (req: Request, res: Response, next: NextFunction): void => {
  console.log("IT-INCUBATOR");
  next();
};

blogsRouter.use(ITINCUBATOR);

blogsRouter.get("/", ITINCUBATOR, async (req: Request, res: Response) => {
  const allBlogs = await blogsService.findAllBlogs();

  res.status(200).send(allBlogs);
});

blogsRouter.post(
  "/",
  basicAuthorizationMiddleware,
  nameValidation(),
  descriptionValidation(),
  webSiteUrlValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const blogCreateData: BlogInputType = req.body;
    const newBlog: BlogOutputType | null = await blogsService.addNewBlog(
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
    const updateBlog = await blogsService.updateBlogById(blogUpdateData, id);
    if (updateBlog) {
      res.status(204).send(updateBlog);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  let blog = await blogsService.findBlogById(id);
  if (blog) {
    res.send(blog);
  } else res.send(404);
});

blogsRouter.delete(
  "/:id",
  basicAuthorizationMiddleware,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const answer = await blogsService.deleteBlogById(id);
    if (answer === true) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
