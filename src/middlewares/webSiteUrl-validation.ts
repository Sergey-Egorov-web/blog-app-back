import { body } from "express-validator";

export const webSiteUrlValidation = () => {
  return body("websiteUrl")
    .trim()
    .notEmpty()
    .withMessage("websiteUrl can't be empty")
    .isURL()
    .withMessage("field url must be Url")
    .isLength({ min: 3, max: 100 })
    .withMessage("websiteUrl length must be between 3 and 100 characters");
};
