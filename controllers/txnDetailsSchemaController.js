import createError from "http-errors";
import { TxnDetails } from "../models/txnDetailsModel.js";

export const transactionDetails = async (req, res) => {
  try {
    //Get user input
    const { txnType, asset, amount, from, txHash } = req.body;
    if (!(txnType, asset, amount, from, txHash)) {
      res.send("All inputs required");
    }

    // Create txn details entry in database
    const details = await TxnDetails.create({
      txnType,
      asset,
      amount,
      from,
      txHash,
    });

    res.send(details);
  } catch (err) {
    res.send("Details not stored");
  }
};
