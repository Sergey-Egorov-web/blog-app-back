import jwt from "jsonwebtoken";

import "dotenv/config";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../configuration";
import { expireTimeAccessToken, expireTimeRefreshToken } from "../constant";

export const jwtService = {
  async createAccessTokenJWT(id: string) {
    const accessToken = jwt.sign({ userId: id }, JWT_ACCESS_SECRET, {
      expiresIn: expireTimeAccessToken,
    });
    return accessToken;
  },

  async createRefreshTokenJWT(id: string) {
    const refreshToken = jwt.sign({ userId: id }, JWT_REFRESH_SECRET, {
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
  async getUserIdByRefreshToken(token: string) {
    try {
      const result: any = jwt.verify(token, JWT_REFRESH_SECRET);
      // console.log("jwtService userId", result.userId);
      return result.userId;
    } catch (error) {
      return null;
    }
  },
};
