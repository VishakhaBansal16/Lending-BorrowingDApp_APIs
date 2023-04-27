import { initBorrowBalance } from "../scripts/borrowBalance.js";
import { logger } from "../logger.js";

export const borrowBalance = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const balance = await initBorrowBalance(account);

    res.json({ balance });
  } catch (err) {
    logger.error(err);
    res.send("Balance not found");
  }
};
