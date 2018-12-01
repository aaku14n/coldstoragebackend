import { route } from "./";
import logger from "../lib/logger";
import TransactionModel from "../db/TransactionModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const transactionModel = new TransactionModel();
  try {
    const transactionDetails = req.body;
    const { farmerId } = req.params;
    const transactionObj = await transactionModel.create(
      farmerId,
      transactionDetails
    );
    res.send({ results: transactionObj });
  } catch (error) {
    logger.log({
      label: "error",
      message: error,
      req: JSON.stringify({ body: req.body, query: req.params })
    });
    throw new ApplicationError(error, 500);
  }
});
export const put = route(async (req, res) => {
  const transactionModel = new TransactionModel();
  try {
    const transactionDetails = req.body;
    const { transactionId } = req.params;
    const user = await transactionModel.put(transactionId, transactionDetails);
    res.send({ results: user });
  } catch (error) {
    logger.log({
      label: "error",
      message: error,
      req: JSON.stringify({ body: req.body, query: req.params })
    });
    throw new ApplicationError(error, 500);
  }
});
export const getTransactionByFarmerId = route(async (req, res) => {
  const transactionModel = new TransactionModel();
  try {
    const { farmerId } = req.params;
    const transactions = await transactionModel.getTransactionsByFarmerId(
      farmerId
    );
    res.send({ results: transactions });
  } catch (error) {
    logger.log({
      label: "error",
      level: "error",
      message: error,
      req: JSON.stringify(req.params)
    });
    throw new ApplicationError(error, 500);
  }
});
