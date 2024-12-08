import { param } from "express-validator";
import { blogsQueryRepository } from "../repositories/blog-db-query-repository";
import { Request, Response, NextFunction } from "express";

export const blogIdUriParamPostValidation = (
  // export function blogIdUriParamPostValidation(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return param("blogId")
    .trim()
    .isString()
    .withMessage("blogId must be string")
    .notEmpty()
    .withMessage("blogId can't be empty")
    .custom(async (id) => {
      const blog = await blogsQueryRepository.findBlogById(id);
      if (!blog) {
        // throw new Error("Blog not found");
        res.status(404).send("Not Found");
      } else {
        next();
      }
    });
  //   return true;
  // })
  // .withMessage("Blog not found");
};
