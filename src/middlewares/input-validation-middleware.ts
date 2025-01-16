import { Response, Request, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: Result = validationResult(req);

  let errors = result.array({ onlyFirstError: true });
  // let errors = result.array();
  const errorsMessages = errors.map((model) => ({
    message: model.msg,
    field: model.path,
  }));

  if (!result.isEmpty()) {
    res.status(400).send({ errorsMessages });
  } else {
    next();
  }
};
