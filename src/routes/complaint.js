import { route } from "./";
import ComplaintModel from "../db/ComplaintModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const complaintModel = new ComplaintModel();
  try {
    const commentInformation = req.body;
   
    const complain = await complaintModel.create(commentInformation);

    res.send({ results: complain });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const get = route(async (req, res) => {
  const complaintModel = new ComplaintModel();
  try {
    const complain = await complaintModel.get();
    res.send({ results: complain });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getById = route(async (req, res) => {
  const complaintModel = new ComplaintModel();
  try {
    let commentId = req.params.Id;
    const complain = await complaintModel.getById(commentId);
    res.send({ results: complain });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const put = route(async (req, res) => {
  const complaintModel = new ComplaintModel();
  try {
    let commentId = req.params.Id;
    let commentInformation = req.body;
    const complain = await complaintModel.put(commentId, commentInformation);
    res.send({ results: complain });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
