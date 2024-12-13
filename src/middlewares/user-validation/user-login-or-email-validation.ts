import { body } from "express-validator";

export function userLoginOrEmailValidation() {
  return (
    body("loginOrEmail")
      .trim()
      .notEmpty()
      .withMessage("loginOrEmail can't be empty")
      // .isLength({ min: 6, max: 20 })
      // .withMessage("loginOrEmail length must be between 3 and 10 characters")
      .matches(/^[a-zA-Z0-9_-]+$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .withMessage(
        "email must contain only letters, numbers, underscores, and hyphens"
      )
  );
  // .matches(/^[a-zA-Z0-9_-]*$/)
  // .withMessage(
  //   "Login must contain only letters, numbers, underscores, and hyphens"
  // );
}
