import { initBalanceOf } from "../scripts/balanceOf.js";
import { logger } from "../logger.js";

export const balanceOf = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const usdcSuppliedBalance = await initBalanceOf(account);

    res.json({ usdcSuppliedBalance });
  } catch (err) {
    logger.error(err);
    res.send("User base asset supplied balance not found");
  }
};
