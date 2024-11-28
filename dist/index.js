"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Загрузка переменных окружения из файла .env
const settings_1 = require("./settings");
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
console.log(process.env.MONGO_URL);
settings_1.app.listen(port, () => {
    console.log(`blog-app-back app listening on port ${port}`);
});
