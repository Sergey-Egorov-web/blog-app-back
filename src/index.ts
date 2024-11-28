import "dotenv/config"; // Загрузка переменных окружения из файла .env

import { app } from "./settings";

const port = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";

console.log(process.env.MONGO_URL);

app.listen(port, () => {
  console.log(`blog-app-back app listening on port ${port}`);
});
