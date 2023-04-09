import createError from "http-errors";
import { BorrowAsset } from "../models/borrowSchema.js";

export const borrowedAsset = async (req, res, next) => {
  try {
    //Get user input
    const { asset, amount, from, txHash } = req.body;
    if (!(asset, amount, from, txHash)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    // Create borrowed tokens entry in database
    const borrow = await BorrowAsset.create({
      asset,
      amount,
      from,
      txHash,
    });

    res.status(201).send(borrow);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
