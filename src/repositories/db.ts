import { MongoClient } from "mongodb";

const mongoURI = process.env.mongoURL || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoURI);

export async function runDB() {
  try {
    await client.connect();

    await client.db("Blogger Platform").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Can't connect to Db");
    await client.close();
  }
}
