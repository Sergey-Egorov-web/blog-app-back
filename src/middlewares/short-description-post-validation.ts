import { body } from "express-validator";

export function shortDescriptionPostValidation() {
  return body("shortDescription")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("shortDescription can't be empty")
    .isLength({ min: 5, max: 30 })
    .withMessage(
      "shortDescription length must be between 5 and 100 characters"
    );
}
