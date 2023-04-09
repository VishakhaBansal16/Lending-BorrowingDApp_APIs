import createError from "http-errors";
import { SupplyAsset } from "../models/supplySchema.js";

export const suppliedAsset = async (req, res, next) => {
  try {
    //Get user input
    const { asset, amount, from, txHash } = req.body;
    if (!(asset, amount, from, txHash)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    // Create supplied tokens entry in database
    const supply = await SupplyAsset.create({
      asset,
      amount,
      from,
      txHash,
    });

    res.status(201).send(supply);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
