import { MongoClient } from "mongodb";

const mongoUri =
  process.env.mongoURL || "mongodb://0.0.0.0:27017/BloggerPlatform";

export const client = new MongoClient(mongoUri);

export async function runDB() {
  try {
    await client.connect();

    await client.db("BloggerPlatform").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Can't connect to Db");
    await client.close();
  }
}
// connectToDatabase();