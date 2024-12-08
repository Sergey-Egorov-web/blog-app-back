import { body } from "express-validator";

export function userLoginValidation() {
  return body("login")
    .trim()
    .notEmpty()
    .withMessage("login can't be empty")
    .isString()
    .withMessage("login must be a string")
    .isLength({ min: 3, max: 10 })
    .withMessage("login length must be between 3 and 10 characters")
    .matches(/^[a-zA-Z0-9_-]*$/)
    .withMessage(
      "Login must contain only letters, numbers, underscores, and hyphens"
    );
}
