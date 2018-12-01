import { route } from "./";

import { ApplicationError } from "../lib/errors";
import PincodeModel from "../db/PincodeModel";

export const getLocationByPincode = route(async (req, res) => {
  const pincode = req.params.pincode;
  try {
    const pinCodeModel = new PincodeModel();
    const pincodeResponse = await pinCodeModel.getLocationByPincode(pincode);

    res.send({ results: pincodeResponse });
  } catch (error) {
    throw new ApplicationError(error, 500);
  }
});
