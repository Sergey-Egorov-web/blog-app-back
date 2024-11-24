import { body } from "express-validator";

export function nameValidation() {
  return body("name")
    .trim()
    .notEmpty()
    .withMessage("name can't be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("name length must be between 3 and 15 characters");
}
