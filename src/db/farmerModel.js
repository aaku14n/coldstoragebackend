import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as farmerSchema } from "../schemas/farmer.schema";
import { default as orderSchema } from "../schemas/order.schema";
import { default as transactionSchema } from "../schemas/transaction.schema";
import { default as userSchema } from "../schemas/user.schema";
import {
  ERROR_CODE_INVALID_DETAIL,
  ERROR_CODE_CREATING_FARMER
} from "../lib/errorCode";
import { CREDIT } from "../lib/constant";

export default class CommentModel extends BaseModel {
  constructor(connection) {
    super("farmer", connection);
    this.schema = farmerSchema;
    this.name = "farmer";
    this.model = this.connection.model(this.name, this.schema);
    this.userModel = this.connection.model("User", userSchema);
    this.orderModel = this.connection.model("Order", orderSchema);
    this.transactionModel = this.connection.model(
      "Transaction",
      transactionSchema
    );
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
        coldStorageId: coldStorageId
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
  async editFarmer(coldStorageId, farmerDetails) {
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
      const farmerResponse = await this.model.findOneAndUpdate(
        { _id: farmerDetails._id, statusFlag: true },
        { $set: farmerDetails },
        { new: true }
      );
      return farmerResponse;
    } catch (error) {
      throw error;
    }
  }
  async getFarmerDetails(farmerId) {
    try {
      const farmerDetails = await this.model
        .findOne({
          farmerId: farmerId,
          statusFlag: true
        })
        .lean();
      const orders = await this.orderModel
        .find({ farmerId: farmerId })
        .sort({ createdAt: -1 });
      const transactions = await this.transactionModel
        .find({
          farmerId: farmerId
        })
        .sort({ createdAt: -1 });

      farmerDetails.lastOrder = orders[0];
      farmerDetails.lastTransaction = transactions[0];

      const debitedOrders = [],
        creditedOrders = [],
        debitedTransactions = [],
        creditedTransaction = [];
      orders.forEach(order => {
        if (order.transactionType === CREDIT) {
          creditedOrders.push(order);
        } else {
          debitedOrders.push(order);
        }
      });

      let totalBag =
        (creditedOrders
          ? creditedOrders.reduce((sum, order) => sum + order.numberOfBag, 0)
          : 0) -
        (debitedOrders
          ? debitedOrders.reduce((sum, order) => sum + order.numberOfBag, 0)
          : 0);
      transactions.forEach(transaction => {
        if (transaction.transactionType === CREDIT) {
          creditedTransaction.push(transaction);
        } else {
          debitedTransactions.push(transaction);
        }
      });

      let totalCreditedAmount = creditedTransaction
        ? creditedTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          )
        : 0;
      let totalDebitedAmount = debitedTransactions
        ? debitedTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          )
        : 0;

      let totalAmount = totalCreditedAmount - totalDebitedAmount;

      farmerDetails.totalAmount = totalAmount;
      farmerDetails.totalBag = totalBag;

      return { farmerDetails, orders, transactions };
    } catch (error) {
      throw error;
    }
  }
}
