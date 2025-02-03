import { Result } from "express-validator";
import { blackListRefreshTokenDbType } from "../types/types";
import { blackListRefreshTokenCollection } from "./db";

export const blacklistDbRepository = {
  async addNewRefreshToken(newRefreshToken: string): Promise<boolean> {
    try {
      // Проверяем, существует ли уже документ с массивом токенов
      const existingDocument = await blackListRefreshTokenCollection.findOne();

      if (!existingDocument) {
        // Если документ не существует, создаем новый с пустым массивом
        await blackListRefreshTokenCollection.insertOne({ tokens: [] });
      }

      // Добавляем новую строку в массив токенов
      await blackListRefreshTokenCollection.updateOne(
        {},
        { $push: { tokens: newRefreshToken } }
      );

      return true;
    } catch (error) {
      console.error("Error adding new refresh token:", error);
      return false;
    }
  },
  async checkRefreshTokenIntoBlacklist(
    newRefreshToken: string
  ): Promise<boolean> {
    try {
      const result: blackListRefreshTokenDbType | null =
        await blackListRefreshTokenCollection.findOne({
          tokens: newRefreshToken,
        });

      if (result) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Ошибка добавления нового refresh токена:", error);
      return false;
    }
  },
};
