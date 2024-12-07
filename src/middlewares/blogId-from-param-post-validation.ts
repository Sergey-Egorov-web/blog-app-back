import { param } from "express-validator";
import { blogsQueryRepository } from "../repositories/blog-db-query-repository";

export function blogIdUriParamPostValidation() {
  return param("blogId")
    .trim()
    .isString()
    .withMessage("blogId must be string")
    .notEmpty()
    .withMessage("blogId can't be empty")
    .custom(async (id) => {
      const blog = await blogsQueryRepository.findBlogById(id);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return true;
    })
    .withMessage("Blog not found");
}
