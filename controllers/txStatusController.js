import createError from "http-errors";
import { initTxnStatus } from "../scripts/transactionStatus.js";

export const transactionStatus = async (req, res, next) => {
  try {
    //Get user input
    const { txHash } = req.query;
    if (!txHash) {
      res.status(400).json({
        status: "failed",
        message: "An input is required",
      });
    }

    const transactionStatus = await initTxnStatus(txHash);

    if (!transactionStatus) {
      throw createError(404, "Not Found");
    }

    res.status(201).send(transactionStatus);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
