import { initSupply } from "../scripts/supply.js";
import { logger } from "../logger.js";

export const supplyAsset = async (req, res) => {
  try {
    //Get user input
    const { asset, amount } = req.body;
    if (!(asset, amount)) {
      res.send("All inputs required");
    }

    const unsignedTransactionObject = await initSupply(asset, amount);

    if (!unsignedTransactionObject) {
      res.send("Page not found");
    }

    res.send(unsignedTransactionObject);
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
