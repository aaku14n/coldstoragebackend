import mongoose from "mongoose";
import { CREDIT, DEBIT } from "../lib/constant";

const Order = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true
    },
    numberOfBag: {
      type: Number,
      required: true
    },
    receiptNo: {
      type: Number
    },
    submittingPersonName: String,
    submittingPersonMobileNo: {
      type: Number
    },
    status: {
      type: Boolean,
      default: true
    },
    transactionType: {
      type: String,
      enum: [CREDIT, DEBIT],
      required: true
    },
    itemType: {
      type: String
    },
    coldStorageId: {
      type: String,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
Order.virtual("coldStorage", {
  ref: "ColdStorage",
  localField: "coldStorageId",
  foreignField: "coldStorageId"
});
Order.virtual("user", {
  ref: "User",
  localField: "createdBy",
  foreignField: "userId"
});
Order.virtual("farmer", {
  ref: "Farmer",
  localField: "farmerId",
  foreignField: "farmerId"
});
export default Order;
