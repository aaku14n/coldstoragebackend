import { route } from "./";

import { generateToken } from "../lib/token";
import ColdStorageModel from "../db/ColdStorageModel";
import UserModel from "../db/UserModel";
import { ApplicationError } from "../lib/errors";
import { ADMIN } from "../lib/constant";

export const create = route(async (req, res) => {
  const coldStorageModel = new ColdStorageModel();

  const userModel = new UserModel();
  try {
    const coldStorageDetails = req.body;
    const coldStorage = await coldStorageModel.create(coldStorageDetails);
    const userInformation = {
      name: coldStorageDetails.ownerName,
      coldStorageId: coldStorage.coldStorageId,
      password: coldStorageDetails.password,
      userType: ADMIN,
      username: coldStorageDetails.ownerUserName
    };
    const userStorage = await userModel.create(userInformation);
    const token = await generateToken(userStorage.userId);
    res.send({ results: { userId: userStorage.userId, token } });
  } catch (error) {
    throw new ApplicationError(error, 500);
  }
});
export const get = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    const users = await userModel.get();
    res.send({ results: users });
  } catch (error) {
    throw new ApplicationError(error, 500);
  }
});

export const getById = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    let userId = req.params.Id;
    const user = await userModel.getById(userId);
    res.send({ results: user });
  } catch (error) {
    throw new ApplicationError(error, 500);
  }
});
export const put = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    let userId = req.params.Id;
    let userInformation = req.body;
    const user = await userModel.put(userId, userInformation);
    res.send({ results: user });
  } catch (error) {
    throw new ApplicationError(error, 500);
  }
});
