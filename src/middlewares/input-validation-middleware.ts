import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

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
