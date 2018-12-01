import { route } from ".";
import FarmerModel from "../db/farmerModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const farmerModel = new FarmerModel();
  try {
    const farmerDetail = req.body;
    const coldStorageId = req.params.coldStorageId;
    const formerObj = await farmerModel.create(coldStorageId, farmerDetail);

    res.send({ results: formerObj });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const get = route(async (req, res) => {
  const farmerModel = new FarmerModel();
  try {
    const comments = await farmerModel.get();
    res.send({ results: comments });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getFarmerByColdId = route(async (req, res) => {
  const farmerModel = new FarmerModel();
  try {
    let coldStorageId = req.params.coldStorageId;
    const farmersList = await farmerModel.getFarmerByColdId(coldStorageId);
    res.send({ results: farmersList });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const put = route(async (req, res) => {
  const farmerModel = new FarmerModel();
  try {
    let commentId = req.params.Id;
    let commentInformation = req.body.commentInformation;
    const comment = await farmerModel.put(commentId, commentInformation);
    res.send({ results: comment });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
