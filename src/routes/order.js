import { route } from "./";
import logger from "../lib/logger";
import OrderModel from "../db/OrderModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const orderModel = new OrderModel();
  try {
    const orderDetails = req.body;
    const { farmerId } = req.params;
    const orderObj = await orderModel.create(farmerId, orderDetails);
    res.send({ results: orderObj });
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
  const orderModel = new OrderModel();
  try {
    const orderDetails = req.body;
    const { orderId } = req.params;
    const user = await orderModel.put(orderId, orderDetails);
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
export const getOrdersByFarmerId = route(async (req, res) => {
  const orderModel = new OrderModel();
  try {
    const { farmerId } = req.params;
    const orders = await orderModel.get(farmerId);
    res.send({ results: orders });
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
