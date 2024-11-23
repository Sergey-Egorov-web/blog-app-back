import { Response, Request, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import path from "path";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: Result = validationResult(req);

  let errors = result.array({ onlyFirstError: true });

  const errorsMessages = errors.map((blog) => ({
    msg: blog.msg,
    path: blog.path,
  }));

  if (!result.isEmpty()) {
    res.status(400).send({ errorsMessages });
  } else {
    next();
  }
};
