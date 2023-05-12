import { initAbsorb } from "../scripts/absorb.js";
import { logger } from "../logger.js";

export const absorb = async (req, res) => {
  try {
    //Get user input
    const { absorber, accounts } = req.body;
    if (!(absorber, accounts)) {
      res.send("All inputs required");
    }

    const unsignedTransactionObject = await initAbsorb(absorber, accounts);

    if (!unsignedTransactionObject) {
      res.send("Page not found");
    }

    res.send(unsignedTransactionObject);
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
