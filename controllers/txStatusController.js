import createError from "http-errors";
import { initTxnStatus } from "../scripts/transactionStatus.js";

export const transactionStatus = async (req, res) => {
  try {
    //Get user input
    const { txHash } = req.query;
    if (!txHash) {
      res.send("An input is required");
    }

    const transactionStatus = await initTxnStatus(txHash);

    if (!transactionStatus) {
      res.send("Page not found");
    }

    res.send(transactionStatus);
  } catch (err) {
    res.send("Trxn status not found");
  }
};
