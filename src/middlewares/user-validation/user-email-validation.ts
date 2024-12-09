import { body } from "express-validator";

export function userEmailValidation() {
  return body("email")
    .trim()
    .notEmpty()
    .withMessage("email can't be empty")
    .isLength({ min: 6, max: 20 })
    .withMessage("email length must be between 3 and 10 characters")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage(
      "email must contain only letters, numbers, underscores, and hyphens"
    );
}
