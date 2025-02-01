//import "dotenv/config"; // Загрузка переменных окружения из файла .env
import * as dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 5000;
export const username = process.env.USERNAME_BASIC;
export const password = process.env.PASSWORD;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "111";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "111";
