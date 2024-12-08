import { body } from "express-validator";

export function userEmailValidation() {
  return body("password")
    .trim()
    .notEmpty()
    .withMessage("password can't be empty")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length must be between 3 and 10 characters")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage(
      "password must contain only letters, numbers, underscores, and hyphens"
    );
}
