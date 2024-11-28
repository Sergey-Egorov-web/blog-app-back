import { MongoClient } from "mongodb";

const mongoUri = process.env.mongoUri || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);

export async function runDB() {
  try {
    await client.connect();

    await client.db("Blogger Platform").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    await client.close();
  }
}
