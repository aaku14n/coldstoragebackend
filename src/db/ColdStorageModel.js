import BaseModel from "./BaseModel";

import { default as coldStorageSchema } from "../schemas/coldStorage.schema";
import { ERROR_CODE_COLD_STORAGE_CREATE } from "../lib/errorCode";

export default class ColdStorageModel extends BaseModel {
  constructor(connection) {
    super("coldStorage", connection);
    this.schema = coldStorageSchema;
    this.name = "coldStorage";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(coldStorageDetails) {
    try {
      // for now we are storing coldstorage id after information
      // we may change this
      Object.assign(coldStorageDetails, {
        coldStorageIdentityId: coldStorageDetails.coldStorageId
      });
      delete coldStorageDetails.coldStorageId;
      const coldStorage = await this.model.create(coldStorageDetails);
      if (!coldStorage) {
        throw {
          errorCode: ERROR_CODE_COLD_STORAGE_CREATE,
          message: "Error while creating cold storage"
        };
      }
      return coldStorage._doc;
    } catch (error) {
      throw error;
    }
  }

  async get() {
    try {
      const users = await this.model.find({
        statusFlag: true
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getById(userId) {
    try {
      const user = await this.model.find({
        userId: userId,
        statusFlag: true
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async put(userId, userInformation) {
    try {
      const user = await this.model.findOneAndUpdate(
        { userId: userId, statusFlag: true },
        { $set: userInformation },
        { new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
}
