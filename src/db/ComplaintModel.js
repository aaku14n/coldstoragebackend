import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";
import { default as complaintSchema } from "../schemas/complaint.schema";

export default class ComplaintModel extends BaseModel {
  constructor(connection) {
    super("complaint", connection);
    this.schema = complaintSchema;
    this.name = "complaint";
    this.model = this.connection.model(this.name, this.schema);
    this.userModel = this.connection.model("User", userSchema);
    this.commentModel = this.connection.model("Comment", commentSchema);
  }
  async create(commentInformation) {
    try {
      const complaint = await this.model.create(commentInformation);

      if (!complaint) {
        return null;
      }

      return complaint._doc;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async get() {
    try {
      const complaints = await this.model.find({
        statusFlag: true
      });

      return complaints;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async getById(complaintId) {
    try {
      console.log(complaintId);
      const complaint = await this.model.find({
        complainId: complaintId,
        statusFlag: true
      });

      return complaint;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async put(complaintId, complaintInformation) {
    try {
      const complaint = await this.model.findOneAndUpdate(
        { complainId: complaintId, statusFlag: true },
        { $set: complaintInformation },
        { new: true }
      );
      return complaint;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
