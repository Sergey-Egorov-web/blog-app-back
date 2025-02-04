import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import "dotenv/config";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../configuration";
import { expireTimeAccessToken, expireTimeRefreshToken } from "../constant";
import { blacklistDbRepository } from "../repositories/blacklist-db-repository";

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

  //_____________________________________________________________________________

  // async createAccessTokenJWT(userId: string): Promise<string> {
  //   try {
  //     const token = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
  //       expiresIn: expireTimeAccessToken,
  //     });
  //     return token;
  //   } catch (error) {
  //     console.error("Error creating access token:", error);
  //     throw error; // Пробрасываем ошибку дальше
  //   }
  // },

  // async createRefreshTokenJWT(userId: string): Promise<string> {
  //   try {
  //     const token = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
  //       expiresIn: expireTimeRefreshToken,
  //     });
  //     return token;
  //   } catch (error) {
  //     console.error("Error creating refresh token:", error);
  //     throw error; // Пробрасываем ошибку дальше
  //   }
  // },
  //________________________________________________________________________________________
  async getUserIdByAccessToken(token: string) {
    try {
      const result: any = jwt.verify(token, JWT_ACCESS_SECRET);
      // console.log("jwtService userId", result.userId);
      return result.userId;
    } catch (error) {
      return null;
    }
  },
  async getUserIdByRefreshToken(token: string) {
    try {
      console.log("jwtService11 userId", token);
      const result: any = jwt.verify(token, JWT_REFRESH_SECRET);
      console.log("jwtService1 userId", result.userId);
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
      console.log("jwtService2 userId", error);
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
};
