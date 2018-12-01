import mongoose from "mongoose";
import uuid from "uuid";

const ColdStorage = new mongoose.Schema(
  {
    coldStorageId: { type: String, default: uuid.v1 },

    coldStorageName: {
      type: String,
      required: true
    },
    coldStorageIdentityId: {
      type: "String"
    },
    ownerUserName: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    },
    interestRate: {
      type: Number
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);

export default ColdStorage;
