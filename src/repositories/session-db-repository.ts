import { createEntity, sessionsCollectionDbType } from "../types/types";
import { sessionsCollection } from "./db";

export const sessionDbRepository = {
  async addNewSession(
    newSession: sessionsCollectionDbType
  ): Promise<any | null> {
    await sessionsCollection.insertOne(newSession);
    // console.log("sessionDbRepository", newSession);
    // return newBlog;

    const result = await sessionsCollection.findOne({
      sessionId: newSession.sessionId,
    });
    // console.log("sessionDbRepository", result);
    if (result) {
      return createEntity.create;
    } else {
      return createEntity.mistake;
    }
  },
};
