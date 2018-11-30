import mongoose from "mongoose";
import uuid from "uuid";
import { default as commentSchema } from "../schemas/comment.schema";
const Complaint = new mongoose.Schema(
  {
    complainId: { type: String, default: uuid.v1 },

    statusFlag: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      default: null
    },
    complaintHeading: {
      type: String,
      default: null
    },
    complaintDescription: {
      type: String,
      default: null
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);

export default Complaint;
