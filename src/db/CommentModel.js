import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as commentSchema } from "../schemas/comment.schema";

export default class CommentModel extends BaseModel {
  constructor(connection) {
    super("comment", connection);
    this.schema = commentSchema;
    this.name = "comment";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(commentInformation) {
    try {
      const comment = await this.model.create(commentInformation);
      if (!comment) {
        return null;
      }

      return comment._doc;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
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
  async getById(commentId) {
    try {
      const comment = await this.model
        .find({
          _id: commentId,
          statusFlag: true
        })
        .sort({ createdAt: -1 })
        .populate("user");
      return comment;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async put(commentId, commentInformation) {
    try {
      const comment = await this.model.findOneAndUpdate(
        { _id: commentId, statusFlag: true },
        { $set: commentInformation },
        { new: true }
      );
      return comment;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
