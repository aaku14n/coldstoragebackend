import BaseModel from "./BaseModel";

import { default as pincodeSchema } from "../schemas/pincode.schema";
import { ERROR_CORE_NO_LOCATION_FOR_PINCODE } from "../lib/errorCode";

export default class ColdStorageModel extends BaseModel {
  constructor(connection) {
    super("pincode", connection);
    this.schema = pincodeSchema;
    this.name = "pincode";
    this.model = this.connection.model(this.name, this.schema);
  }
  async getLocationByPincode(pincode) {
    try {
      const pincodeResponse = await this.model.findOne({ pincode: pincode });

      if (!pincodeResponse) {
        throw {
          errorCode: ERROR_CORE_NO_LOCATION_FOR_PINCODE,
          message: "No Location Found for this pincode"
        };
      }
      return pincodeResponse;
    } catch (error) {
      throw error;
    }
  }
}
