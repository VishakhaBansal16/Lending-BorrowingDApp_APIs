import { initLiquidatedSupplyOrWithdraw } from "../scripts/liquidatedSupplyOrWithdraw.js";
import { logger } from "../logger.js";

export const liquidatedSupplyOrWithdraw = async (req, res) => {
  try {
    //Get user input
    const { recipient, amount, withdrawLeftOver } = req.body;
    if (!(recipient, amount, withdrawLeftOver)) {
      res.send("All inputs required");
    }

    const unsignedTransactionObject = await initLiquidatedSupplyOrWithdraw(
      recipient,
      amount,
      withdrawLeftOver
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
