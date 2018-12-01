import BaseModel from "./BaseModel";
import { default as orderSchema } from "../schemas/order.schema";
import { default as farmerSchema } from "../schemas/user.schema";
import { ERROR_CODE_INVALID_DETAIL } from "../lib/errorCode";

export default class userModel extends BaseModel {
  constructor(connection) {
    super("Order", connection);
    this.schema = orderSchema;
    this.name = "Order";
    this.model = this.connection.model(this.name, this.schema);
    this.farmerModel = this.connection.model("Farmer", farmerSchema);
  }
  async create(farmerId, orderDetails) {
    try {
      const { userId, coldStorageId } = orderDetails;
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
      const orderObj = Object.assign({}, orderDetails, {
        createdBy: userId,
        farmerId: farmerId
      });
      return await this.model.create(orderObj);
    } catch (error) {
      throw error;
    }
  }

  async put(orderId, orderDetails) {
    try {
      const { userId, coldStorageId, farmerId } = orderDetails;
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
      const updatedOrder = await this.model.findOneAndUpdate(
        { _id: orderId, status: true },
        { $set: orderDetails },
        { new: true }
      );

      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }
  async get(farmerId) {
    try {
      const orders = await this.model.find({
        farmerId: farmerId,
        status: true
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }
}
