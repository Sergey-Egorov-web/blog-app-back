//import "dotenv/config"; // Загрузка переменных окружения из файла .env
import * as dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 5000;
export const username = process.env.USERNAME_BASIC;
export const password = process.env.PASSWORD;
