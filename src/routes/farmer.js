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
export const editFarmer = route(async (req, res) => {
  const farmerModel = new FarmerModel();
  try {
    const coldStorageId = req.params.coldStorageId;
    const farmerDetails = req.body;
    const updateFarmer = await farmerModel.editFarmer(
      coldStorageId,
      farmerDetails
    );
    res.send({ results: updateFarmer });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getFarmerDetails = route(async (req, res) => {
  const farmerModel = new FarmerModel();
  try {
    const { farmerId } = req.params;
    const farmerDetails = await farmerModel.getFarmerDetails(farmerId);
    res.send({ results: farmerDetails });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
