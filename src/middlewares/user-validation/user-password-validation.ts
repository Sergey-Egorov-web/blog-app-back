import { body } from "express-validator";

export function userPasswordValidation() {
  return body("password")
    .trim()
    .notEmpty()
    .withMessage("password can't be empty")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length must be between 3 and 10 characters");
}
