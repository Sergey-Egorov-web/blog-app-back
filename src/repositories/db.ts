import { MongoClient } from "mongodb";
import {
  blackListRefreshTokenDbType,
  BlogDbType,
  PostOutputType,
  sessionsCollectionDbType,
  UserDbType,
} from "../types/types";

import "dotenv/config";
import { CommentDbType, CommentViewModel } from "../types/comment-types";

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
  .collection<CommentDbType>("comments");

export const blackListRefreshTokenCollection = client
  .db("BloggerPlatform")
  .collection<blackListRefreshTokenDbType>("blackList");
export const sessionsCollection = client
  .db("BloggerPlatform")
  .collection<sessionsCollectionDbType>("sessions");

export async function runDB() {
  try {
    await client.connect();

    await client.db("BloggerPlatform").command({ ping: 1 });
  } catch {
    await client.close();
  }
}
// connectToDatabase();
