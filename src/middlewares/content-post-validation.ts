import { body } from "express-validator";

export function contentPostValidation() {
  return body("content")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("content can't be empty")
    .isLength({ min: 1, max: 1000 })
    .withMessage("content length must be between 30 and 1000 characters");
}
