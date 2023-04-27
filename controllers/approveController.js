import { initApprove } from "../scripts/approve.js";
import { logger } from "../logger.js";

export const approve = async (req, res) => {
  try {
    //Get user input
    const { asset, value } = req.body;

    if (!(asset, value)) {
      res.send("All inputs required");
    }

    const unsignedTransactionObject = await initApprove(asset, value);

    if (!unsignedTransactionObject) {
      res.send("Page not found");
    }
    res.send(unsignedTransactionObject);
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
