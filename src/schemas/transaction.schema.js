import mongoose from "mongoose";
import { CREDIT, DEBIT } from "../lib/constant";

const Transactions = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true
    },
    amount: {
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
Transactions.virtual("coldStorage", {
  ref: "ColdStorage",
  localField: "coldStorageId",
  foreignField: "coldStorageId"
});
Transactions.virtual("farmer", {
  ref: "Farmer",
  localField: "farmerId",
  foreignField: "farmerId"
});
Transactions.virtual("user", {
  ref: "User",
  localField: "createdBy",
  foreignField: "userId"
});
export default Transactions;
