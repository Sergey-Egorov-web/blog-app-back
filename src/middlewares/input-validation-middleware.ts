import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res
      .status(400)
      .send({ codeResult: 1, errors: result.array({ onlyFirstError: true }) });
  } else {
    next();
  }
};

export const webSiteUrlValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  body("websiteUrl")
    .trim()
    .notEmpty()
    .withMessage("websiteUrl can't be empty")
    .isURL()
    .withMessage("field url must be Url")
    .isLength({ min: 3, max: 100 })
    .withMessage("websiteUrl length must be between 3 and 100 characters");
  next();
};
