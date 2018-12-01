import BaseModel from "./BaseModel";
import { default as transactionSchema } from "../schemas/transaction.schema";
import { default as farmerSchema } from "../schemas/user.schema";
import { ERROR_CODE_INVALID_DETAIL } from "../lib/errorCode";

export default class userModel extends BaseModel {
  constructor(connection) {
    super("Transactions", connection);
    this.schema = transactionSchema;
    this.name = "Transactions";
    this.model = this.connection.model(this.name, this.schema);
    this.farmerModel = this.connection.model("Farmer", farmerSchema);
  }
  async create(farmerId, transactionDetails) {
    try {
      const { userId, coldStorageId } = transactionDetails;
      const verifyDetails = await this.farmerModel.findOne({
        farmerId: farmerId,
        coldStorageId: coldStorageId,
        createdBy: userId
      });
      if (!verifyDetails) {
        throw {
          errorCode: ERROR_CODE_INVALID_DETAIL,
          statusCode: 401,
          message: "You are not allow to do any operation on this farmer"
        };
      }
      const transactionObj = Object.assign({}, transactionDetails, {
        createdBy: userId,
        farmerId: farmerId
      });
      return await this.model.create(transactionObj);
    } catch (error) {
      throw error;
    }
  }

  async put(transactionId, transactionDetails) {
    try {
      const { userId, coldStorageId, farmerId } = transactionDetails;
      const verifyDetails = await this.farmerModel.findOne({
        farmerId: farmerId,
        coldStorageId: coldStorageId,
        createdBy: userId
      });
      if (!verifyDetails) {
        throw {
          errorCode: ERROR_CODE_INVALID_DETAIL,
          statusCode: 401,
          message: "You are not allow to do any operation on this farmer"
        };
      }
      const updatedTransaction = await this.model.findOneAndUpdate(
        { _id: transactionId, status: true },
        { $set: transactionDetails },
        { new: true }
      );

      return updatedTransaction;
    } catch (error) {
      throw error;
    }
  }
  async getTransactionsByFarmerId(farmerId) {
    try {
      const transactions = await this.model.find({
        farmerId: farmerId,
        status: true
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
