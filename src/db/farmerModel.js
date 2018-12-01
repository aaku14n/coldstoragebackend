import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as farmerSchema } from "../schemas/farmer.schema";
import { default as userSchema } from "../schemas/user.schema";
import {
  ERROR_CODE_INVALID_DETAIL,
  ERROR_CODE_CREATING_FARMER
} from "../lib/errorCode";

export default class CommentModel extends BaseModel {
  constructor(connection) {
    super("farmer", connection);
    this.schema = farmerSchema;
    this.name = "farmer";
    this.model = this.connection.model(this.name, this.schema);
    this.userModel = this.connection.model("User", userSchema);
  }
  async create(coldStorageId, farmerDetails) {
    try {
      const { userId } = farmerDetails;

      const verifyUserResponse = await this.userModel.findOne({
        userId,
        coldStorageId
      });

      if (!verifyUserResponse) {
        throw {
          message: "Wrong UserId or cold storage id",
          errorCode: ERROR_CODE_INVALID_DETAIL,
          statusCode: 401
        };
      }
      const farmerObj = Object.assign({}, farmerDetails, {
        createdBy: userId,
        coldStorageId
      });
      const createFarmerRes = await this.model.create(farmerObj);
      if (!createFarmerRes) {
        throw {
          message: "We are facing some problem in creating farmer",
          errorCode: ERROR_CODE_CREATING_FARMER,
          statusCode: 400
        };
      }

      return createFarmerRes;
    } catch (error) {
      throw error;
    }
  }

  async get() {
    try {
      const comments = await this.model.find({
        statusFlag: true
      });
      return comments;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getFarmerByColdId(coldStorageId) {
    try {
      const farmerList = await this.model
        .find({
          coldStorageId: coldStorageId
        })
        .sort({ updatedAt: -1 });

      return farmerList;
    } catch (error) {
      throw error;
    }
  }
  async put(commentId, commentInformation) {
    try {
      const comment = await this.model.findOneAndUpdate(
        { _id: commentId, statusFlag: true },
        { $set: commentInformation },
        { new: true }
      );
      return comment;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
