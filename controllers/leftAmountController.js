import { initLeftAmount } from "../scripts/leftAmount.js";
import { logger } from "../logger.js";

export const leftAmount = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const amount = await initLeftAmount(account);

    res.json({ amount });
  } catch (err) {
    logger.error(err);
    res.send("Amount not found");
  }
};
