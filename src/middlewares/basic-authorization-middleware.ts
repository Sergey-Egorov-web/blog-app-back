import { password, username } from "../configuration";

import { Request, Response, NextFunction } from "express";

// const username = process.env.USERNAME;
// const password = process.env.PASSWORD;

export const basicAuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //' Basic xxxx'

  //TODO вынести в переменные
  // const data = `${username}:${password}`; // admin:qwerty

  // const data = `${"admin"}:${"qwerty"}`;
  console.log(username);
  console.log(password);
  const base64data = Buffer.from(`${username}:${password}`).toString("base64");
  // const base64data = Buffer.from(`${"admin"}:${"qwerty"}`).toString("base64"); //кодируем data в String base64
  const validAuthorizationValue = `Basic ${base64data}`;
  let authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader === validAuthorizationValue) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
