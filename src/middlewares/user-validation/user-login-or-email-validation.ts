import { body } from "express-validator";

export function userLoginOrEmailValidation() {
  return body("loginOrEmail")
    .trim()
    .notEmpty()
    .withMessage("loginOrEmail can't be empty")
    .matches(/^[a-zA-Z0-9_-]+$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage(
      "email must contain only letters, numbers, underscores, and hyphens"
    );
}
