import { body } from "express-validator";

export function blogIdPostValidation() {
  return body("blogId")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("blogId can't be empty");
}
