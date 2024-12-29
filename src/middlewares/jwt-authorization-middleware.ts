import { Request, Response, NextFunction } from "express";

import { jwtService } from "../application/jwtService";

export const jwtAuthorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401);
  } else {
    const token: string | null = authHeader.split(" ")[1];
    try {
      if (token) {
        const userId: string = await jwtService.getUserIdByToken(token);

        if (!userId) {
          res.sendStatus(401);
          return;
        }
        req.userId = userId;

        next();
      }
    } catch (error) {
      console.error("Error while processing token:", error);
    }
  }
};
