import { app } from "./settings";
import { runDB } from "./repositories/db";
import { port } from "./configuration";

// const mongoURI = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";

// console.log(process.env.MONGO_URL);

const startApp = async () => {
  await runDB();

  app.listen(port, () => {
    console.log(`blog-app-back app listening on port ${port}`);
  });
};

startApp();
