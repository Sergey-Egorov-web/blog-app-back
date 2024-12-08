import { NextFunction, Request, Response, Router } from "express";
import { basicAuthorizationMiddleware } from "../../middlewares/basic-authorization-middleware";

export const authRouter = Router({});

authRouter.post("/:login", basicAuthorizationMiddleware);
