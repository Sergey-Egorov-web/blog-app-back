import { body } from "express-validator";

export function titlePostValidation() {
  return body("title")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("title can't be empty")
    .isLength({ min: 1, max: 30 })
    .withMessage("title length must be between 1 and 30 characters");
}
