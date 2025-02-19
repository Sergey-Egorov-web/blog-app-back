import { Request, Response, Router } from "express";
import { jwtAuthorizationMiddleware } from "../../middlewares/jwt-authorization-middleware";
import { sessionQueryRepository } from "../../repositories/session-db-query-repository";
import { DeviceViewModel, sessionsCollectionDbType } from "../../types/types";
import { jwtService } from "../../application/jwtService";

export const securityRouter = Router({});

securityRouter.get(
  "/devices",

  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const userId: string | null = await jwtService.getUserIdByRefreshToken(
      refreshToken
    );
    if (userId) {
      const sessions: DeviceViewModel[] | null =
        await sessionQueryRepository.findAllSessionsByUserId(userId);
      console.log("Security-route", sessions);
      res.status(200).send(sessions);
    }
  }
);
