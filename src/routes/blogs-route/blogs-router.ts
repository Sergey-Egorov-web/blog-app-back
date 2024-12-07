import express, { NextFunction, Request, Response, Router } from "express";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";

import { descriptionValidation } from "../../middlewares/description-validation";
import { webSiteUrlValidation } from "../../middlewares/webSiteUrl-validation";
import {
  BlogInputType,
  BlogOutputType,
  BlogPostInputModel,
  PostInputType,
  PostOutputType,
} from "../../types";
import { nameValidation } from "../../middlewares/name-validation";
import { blogsService } from "../../domains/blogs-service";
import { SortDirection } from "mongodb";
import { blogsQueryRepository } from "../../repositories/blog-db-query-repository";
import { postService } from "../../domains/posts-service";
import { titlePostValidation } from "../../middlewares/title-post-validation";
import { shortDescriptionPostValidation } from "../../middlewares/short-description-post-validation";
import { contentPostValidation } from "../../middlewares/content-post-validation";

export const blogsRouter = Router({});

// blogsRouter.use(express.json());

const ITINCUBATOR = (req: Request, res: Response, next: NextFunction): void => {
  console.log("IT-INCUBATOR");
  next();
};

blogsRouter.use(ITINCUBATOR);

blogsRouter.get("/", ITINCUBATOR, async (req: Request, res: Response) => {
  const searchNameTerm = req.query.searchNameTerm
    ? req.query.searchNameTerm.toString()
    : null;
  const sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
  const sortDirection: SortDirection =
    req.query.sortDirection && req.query.sortDirection.toString() === "asc"
      ? "asc"
      : "desc";
  const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
  const pageSize = req.query.pageSize ? +req.query.pageSize : 10;

  const allBlogs = await blogsQueryRepository.findAllBlogs(
    searchNameTerm,
    sortBy,
    sortDirection,
    pageNumber,
    pageSize
  );

  res.status(200).send(allBlogs);
});

blogsRouter.get("/:blogId", async (req: Request, res: Response) => {
  const blogId = req.params.blogId; // Извлекаем blogId из параметров пути
  const blog = await blogsQueryRepository.findBlogById(blogId);

  res.status(200).send(blog);
});

//__________________________________________________________________________________

blogsRouter.get("/:blogId/posts", async (req: Request, res: Response) => {
  const blogId = req.params.blogId; // Извлекаем blogId из параметров пути
  const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
  const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
  const sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
  const sortDirection: SortDirection =
    req.query.sortDirection && req.query.sortDirection.toString() === "asc"
      ? "asc"
      : "desc";

  const allPostFromBlogId = await blogsQueryRepository.findAllPostsByBlogId(
    blogId,
    pageNumber,
    pageSize,
    sortBy,
    sortDirection
  );

  res.status(200).send(allPostFromBlogId);
});

//_______________________________________________________________

blogsRouter.post(
  "/:blogId/posts",
  basicAuthorizationMiddleware,
  titlePostValidation(),
  shortDescriptionPostValidation(),
  contentPostValidation(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const postCreateData: BlogPostInputModel = req.body;
    const blogId = req.params.blogId; // Извлекаем blogId из параметров пути

    const post: PostInputType | null = {
      title: postCreateData.title,
      shortDescription: postCreateData.shortDescription,
      content: postCreateData.content,
      blogId: blogId,
    };

    const newPost: PostOutputType | null = await postService.addNewPost(post);

    res.status(201).send(newPost);
  }
);

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
  let blog = await blogsQueryRepository.findBlogById(id);
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
