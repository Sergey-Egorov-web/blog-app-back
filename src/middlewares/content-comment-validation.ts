import { body } from "express-validator";

export function contentCommentValidation() {
  console.log("contentCommentValidation");
  return body("content")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("content can't be empty")
    .isLength({ min: 20, max: 300 })
    .withMessage("content length must be between 20 and 300 characters");
}
