import { initRepayBorrow } from "../scripts/repayBorrow.js";
import { logger } from "../logger.js";

export const repayBorrow = async (req, res) => {
  try {
    //Get user input
    const { amount } = req.body;
    if (!amount) {
      res.send("An input required");
    }

    const unsignedTransactionObject = await initRepayBorrow(amount);

    if (!unsignedTransactionObject) {
      res.send("Page not found");
    }

    res.send(unsignedTransactionObject);
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
