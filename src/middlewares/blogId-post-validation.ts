import { body } from "express-validator";

export function blogIdPostValidation() {
  return body("blogId")
    .trim()
    .isString()
    .withMessage("blogId must be string")
    .notEmpty()
    .withMessage("blogId can't be empty");
}
