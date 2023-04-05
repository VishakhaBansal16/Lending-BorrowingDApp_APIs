import createError from "http-errors";
import { initSupply } from "../scripts/supply.js";

export const supplyAsset = async (req, res, next) => {
  try {
    //Get user input
    const { asset, amount } = req.body;
    if (!(asset, amount)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const unsignedTransactionObject = await initSupply(asset, amount);

    if (!unsignedTransactionObject) {
      throw createError(404, "Not Found");
    }

    res.status(201).json({
      unsignedTransactionObject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
