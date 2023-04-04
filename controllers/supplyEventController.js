import createError from "http-errors";
import { initSupplyEvent } from "../scripts/supplyEvent.js";

export const supplyAssetEvent = async (req, res, next) => {
  try {
    //Get user input
    const { from, dst, amount } = req.body;
    if (!(from, dst, amount)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const status = await initSupplyEvent(from, dst, amount);

    if (!status) {
      throw createError(404, "Not Found");
    }

    res.status(201).json({
      eventEmitStatus: status,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
