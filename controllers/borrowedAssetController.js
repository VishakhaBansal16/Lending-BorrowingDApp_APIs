import createError from "http-errors";
import { BorrowAsset } from "../models/borrowSchema.js";

export const borrowedAsset = async (req, res) => {
  try {
    //Get user input
    const { asset, amount, from, txHash } = req.body;
    if (!(asset, amount, from, txHash)) {
      res.send("All inputs required");
    }

    // Create borrowed tokens entry in database
    const borrow = await BorrowAsset.create({
      asset,
      amount,
      from,
      txHash,
    });

    res.send(borrow);
  } catch (err) {
    res.send("Txn obj not found");
  }
};
