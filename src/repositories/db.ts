import { MongoClient } from "mongodb";
import { PostOutputType } from "../types";
import { BlogDbType } from "./blogs-db-repository";

const mongoUri =
  process.env.mongoURL || "mongodb://0.0.0.0:27017/BloggerPlatform";

const client = new MongoClient(mongoUri);

export const postCollection = client
  .db("BloggerPlatform")
  .collection<PostOutputType>("posts");

export const blogCollection = client
  .db("BloggerPlatform")
  .collection<BlogDbType>("blogs");

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
