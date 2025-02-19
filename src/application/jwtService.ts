import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import "dotenv/config";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../configuration";
import { expireTimeAccessToken, expireTimeRefreshToken } from "../constant";
import { blacklistDbRepository } from "../repositories/blacklist-db-repository";
import { v4 as uuidv4 } from "uuid";
import { sessionsCollectionDbType } from "../types/types";
import { sessionDbRepository } from "../repositories/session-db-repository";

export const jwtService = {
  async createAccessTokenJWT(id: string): Promise<string> {
    const accessToken: string = jwt.sign({ userId: id }, JWT_ACCESS_SECRET, {
      expiresIn: expireTimeAccessToken,
    });
    return accessToken;
  },

  async createRefreshTokenJWT(id: string): Promise<string> {
    const refreshToken: string = jwt.sign({ userId: id }, JWT_REFRESH_SECRET, {
      expiresIn: expireTimeRefreshToken,
    });
    return refreshToken;
  },

  async getUserIdByAccessToken(token: string) {
    try {
      const result: any = jwt.verify(token, JWT_ACCESS_SECRET);
      // console.log("jwtService userId", result.userId);
      return result.userId;
    } catch (error) {
      return null;
    }
  },
  async getUserIdByRefreshToken(token: string): Promise<string | null> {
    try {
      // console.log("jwtService11 userId", token);
      const result: any = jwt.verify(token, JWT_REFRESH_SECRET);
      // console.log("jwtService1 userId", result.userId);
      return result.userId;
    } catch (error) {
      // if (error instanceof TokenExpiredError) {
      //   // Если токен истек
      //   return res.status(401).json({ message: "Refresh token expired" });
      // }
      // else {
      //   // Другие ошибки (например, неверная подпись)
      //   console.error("Error verifying refresh token:", error);
      //   return res.status(401).json({ message: "Invalid refresh token" });
      // }
      // console.log("jwtService2 userId", error);
      return null;
    }
  },
  async addRefreshTokenToBlacklist(refreshToken: string) {
    try {
      const result: boolean = await blacklistDbRepository.addNewRefreshToken(
        refreshToken
      );
      // console.log("jwtService userId", result.userId);
      return result;
    } catch (error) {
      return null;
    }
  },

  async checkRefreshTokenIntoBlacklist(refreshToken: string) {
    try {
      const result: boolean =
        await blacklistDbRepository.checkRefreshTokenIntoBlacklist(
          refreshToken
        );
      // console.log("jwtService userId", result.userId);
      return result;
    } catch (error) {
      return false;
    }
  },
  async verifyRefreshToken(token: string): Promise<JwtPayload | null> {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.error("Refresh token expired:", error);
      } else {
        console.error("Error verifying refresh token:", error);
      }
      return null;
    }
  },

  async createNewSession(refreshToken: string, newIp: string, title: string) {
    const newDeviceId: string = uuidv4();
    // const userId: string | null = await this.getUserIdByRefreshToken(
    //   refreshToken
    const decoded: JwtPayload = jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET
    ) as JwtPayload;

    let newSession: sessionsCollectionDbType;

    try {
      if (decoded && decoded.iat !== undefined && decoded.exp !== undefined) {
        newSession = {
          sessionId: uuidv4(),
          deviceId: newDeviceId,
          userId: decoded.userId,
          issuedAt: decoded.iat.toString(),
          deviceName: title,
          ip: newIp,
          expirationDate: decoded.exp.toString(),
        };
        const result = sessionDbRepository.addNewSession(newSession);
      }
    } catch (error) {
      console.error("Can't create new session:", error);
    }
  },
  async deleteSessionById(id: string): Promise<boolean> {
    const result = await sessionDbRepository.deleteSessionById(id);
    console.log("JWTService-deleteSessionById", result);
    if (result === true) {
      return true;
    } else {
      return false;
    }
  },
};
