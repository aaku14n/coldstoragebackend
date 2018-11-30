import mongoose from "mongoose";
import uuid from "uuid";
import * as constants from "../lib/constant";

const User = new mongoose.Schema(
  {
    userId: { type: String, default: uuid.v1 },
    name: { type: String, required: true },
    username: {
      type: String,
      unique: true
    },
    fatherName: { type: String },
    villageName: { type: String },
    address: { type: String },
    town: { type: String },
    district: { type: String },
    state: { type: String },
    pincode: {
      type: Number
    },
    password: {
      type: String
    },
    mobileNo: {
      type: String
    },

    userType: {
      type: String,
      enum: [constants.ADMIN, constants.SUB_ADMIN],
      required: true
    },
    statusFlag: {
      type: Boolean,
      default: true
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
    coldStorageId: {
      type: String
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
User.virtual("coldStorage", {
  ref: "ColdStorage",
  localField: "coldStorageId",
  foreignField: "coldStorageId"
});
export default User;
