import { initTxnStatus } from "../scripts/transactionStatus.js";
import { logger } from "../logger.js";

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
    logger.error(err);
    res.send("Trxn status not found");
  }
};
