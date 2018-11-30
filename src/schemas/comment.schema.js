import mongoose from "mongoose";
import uuid from "uuid";
const Comment = new mongoose.Schema(
  {
    complaintId: { type: String, default: uuid.v1 },
    commentedBy: {
      type: String,
      default: null
    },
    statusFlag: {
      type: Boolean,
      default: true
    },
    commentDescription: {
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

export default Comment;
