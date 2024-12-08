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

  const base64data = Buffer.from(`${username}:${password}`).toString("base64");

  const validAuthorizationValue = `Basic ${base64data}`;
  let authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader === validAuthorizationValue) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
