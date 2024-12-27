import { app } from "./settings";
import { runDB } from "./repositories/db";
import { port } from "./configuration";

// const mongoURI = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";

//

const startApp = async () => {
  await runDB();

  app.listen(port, () => {});
};

startApp();
