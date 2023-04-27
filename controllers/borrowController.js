import { initBorrow } from "../scripts/borrow.js";
import { logger } from "../logger.js";

export const borrowAsset = async (req, res) => {
  try {
    //Get user input
    const { asset, amount } = req.body;
    if (!(asset, amount)) {
      res.send("All inputs required");
    }

    const unsignedTransactionObject = await initBorrow(asset, amount);

    if (!unsignedTransactionObject) {
      res.send("Page not found");
    }

    res.send(unsignedTransactionObject);
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
