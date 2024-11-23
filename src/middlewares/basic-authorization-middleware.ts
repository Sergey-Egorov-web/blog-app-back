import "dotenv/config";

import { Request, Response, NextFunction } from "express";

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

export const basicAuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //' Basic xxxx'

  //TODO убрать let, вынести в переменные
  //   const data = `${username}:${password}`; // admin:qwerty

  const data = `${"admin"}:${"qwerty"}`;

  const base64data = Buffer.from(data).toString("base64"); //кодируем data в String base64
  const validAuthorizationValue = `Basic ${base64data}`;
  let authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader === validAuthorizationValue) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
