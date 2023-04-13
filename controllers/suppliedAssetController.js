import createError from "http-errors";
import { SupplyAsset } from "../models/supplySchema.js";

export const suppliedAsset = async (req, res) => {
  try {
    //Get user input
    const { asset, amount, from, txHash } = req.body;
    if (!(asset, amount, from, txHash)) {
      res.send("All inputs required");
    }

    // Create supplied tokens entry in database
    const supply = await SupplyAsset.create({
      asset,
      amount,
      from,
      txHash,
    });

    res.send(supply);
  } catch (err) {
    res.send("Txn obj not found");
  }
};
