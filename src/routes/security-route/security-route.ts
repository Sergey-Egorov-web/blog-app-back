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
    console.log("securityRouter/devices", refreshToken);
    const userId: string | null = await jwtService.getUserIdByRefreshToken(
      refreshToken
    );
    console.log("securityRouter/devices/userId", userId);
    if (userId) {
      const sessions: DeviceViewModel[] | null =
        await sessionQueryRepository.findAllSessionsByUserId(userId);
      console.log("Security-route", sessions);
      res.status(200).send(sessions);
    }
  }
);
securityRouter.delete(
  "/devices/:id",
  //   basicAuthorizationMiddleware,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    // console.log("securityRouter/devices/:id", id);
    const refreshToken = req.cookies.refreshToken;
    const answer = await jwtService.deleteSessionById(id);
    // console.log("securityRouter/devices/:id", answer);
    if (answer === true) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);
