import { body } from "express-validator";
import { blogsRepository } from "../repositories/blogs-in-memory-repository";

export function blogIdPostValidation() {
  return body("blogId")
    .trim()
    .isString()
    .withMessage("blogId must be string")
    .notEmpty()
    .withMessage("blogId can't be empty")
    .custom(async (id) => {
      const blog = blogsRepository.findBlog(id);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return true;
    })
    .withMessage("Blog not found");
}
