import { MongoClient } from "mongodb";
import { BlogDbType, PostOutputType, UserDbType } from "../types/types";

import "dotenv/config";
import { CommentViewModel } from "../types/comment-types";

const mongoUri = process.env.MONGO_URL;
// || "mongodb://0.0.0.0:27017/BloggerPlatform";

if (!mongoUri) {
  throw new Error("MongoDB connection string is not defined");
}

const client = new MongoClient(mongoUri);

export const postCollection = client
  .db("BloggerPlatform")
  .collection<PostOutputType>("posts");

export const blogCollection = client
  .db("BloggerPlatform")
  .collection<BlogDbType>("blogs");

export const userCollection = client
  .db("BloggerPlatform")
  .collection<UserDbType>("users");

export const commentCollection = client
  .db("BloggerPlatform")
  .collection<CommentViewModel>("comments");

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
