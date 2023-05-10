import { initBuyCollateral } from "../scripts/buyCollateral.js";
import { logger } from "../logger.js";

export const buyCollateral = async (req, res) => {
  try {
    //Get user input
    const { asset, minAmount, baseAmount, recipient } = req.body;
    if (!(asset, minAmount, baseAmount, recipient)) {
      res.send("All inputs required");
    }

    const unsignedTransactionObject = await initBuyCollateral(
      asset,
      minAmount,
      baseAmount,
      recipient
    );

    if (!unsignedTransactionObject) {
      res.send("Page not found");
    }

    res.send(unsignedTransactionObject);
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
