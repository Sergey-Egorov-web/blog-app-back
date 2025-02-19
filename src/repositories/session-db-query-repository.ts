import {
  createEntity,
  DeviceViewModel,
  sessionsCollectionDbType,
} from "../types/types";
import { sessionsCollection } from "./db";

export const sessionQueryRepository = {
  async findAllSessionsByUserId(
    userId: string
  ): Promise<DeviceViewModel[] | null> {
    const foundSessions: sessionsCollectionDbType[] | null =
      await sessionsCollection.find({ userId }).toArray();

    const resultWithoutMongoId: DeviceViewModel[] | null = foundSessions.map(
      (model) => ({
        ip: model.ip,
        title: model.deviceName,
        lastActivateDate: model.issuedAt,
        deviceId: model.deviceId,
      })
    );
    //

    if (resultWithoutMongoId) {
      return resultWithoutMongoId;
    } else {
      return null;
    }
  },
};
