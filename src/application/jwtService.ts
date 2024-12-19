import jwt from "jsonwebtoken";
import { UserDbType, UserViewModel } from "../types";
import "dotenv/config";
import { JWT_SECRET } from "../configuration";
// import { JWT_SECRET } from "../../src/configuration";

// import { settings } from "../settings";

export const jwtService = {
  async createJWT(user: UserViewModel) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "12h",
    });
    return token;
  },

  async getUserIdByToken(token: string) {
    try {
      const result: any = jwt.verify(token, JWT_SECRET);
      console.log("jwtService", result.userId);
      return result.userId;
    } catch (error) {
      return null;
    }
  },
};
