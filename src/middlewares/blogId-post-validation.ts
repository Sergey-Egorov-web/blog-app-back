import { body } from "express-validator";

import { blogsService } from "../domains/blogs-service";

export function blogIdPostValidation() {
  return body("blogId")
    .trim()
    .isString()
    .withMessage("blogId must be string")
    .notEmpty()
    .withMessage("blogId can't be empty")
    .custom(async (id) => {
      const blog = await blogsService.findBlog(id);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return true;
    })
    .withMessage("Blog not found");
}
