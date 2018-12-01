import mongoose from "mongoose";
import uuid from "uuid";
const Farmer = new mongoose.Schema(
  {
    farmerId: { type: String, default: uuid.v1 },
    name: {
      type: String,
      required: true
    },
    fatherName: {
      type: String,
      required: true
    },
    village: {
      type: String
    },
    mobileNo: {
      type: String
    },
    address: String,
    pincode: {
      type: Number,
      maxlength: 6
    },
    state: {
      type: String
    },
    district: String,
    statusFlag: {
      type: Boolean,
      default: true
    },
    coldStorageId: { type: String, required: true },
    createdBy: {
      type: String
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
Farmer.virtual("coldStorage", {
  ref: "ColdStorage",
  localField: "coldStorageId",
  foreignField: "coldStorageId"
});
Farmer.virtual("user", {
  ref: "User",
  localField: "createdBy",
  foreignField: "userId"
});
export default Farmer;
