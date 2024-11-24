import { body } from "express-validator";

export const descriptionValidation = () => {
  return body("description")
    .trim()
    .notEmpty()
    .withMessage("description can't be empty")
    .isLength({ min: 10, max: 500 })
    .withMessage("description length must be between 10 and 500 characters");
};
