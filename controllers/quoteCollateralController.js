import { initQuoteCollateral } from "../scripts/quoteCollateral.js";
import { logger } from "../logger.js";

export const collateral = async (req, res) => {
  try {
    //Get user input
    const { asset, baseAmount } = req.query;
    if (!(asset, baseAmount)) {
      res.send("All inputs required");
    }
    const amount = await initQuoteCollateral(asset, baseAmount);
    res.json({ amount });
  } catch (err) {
    logger.error(err);
    res.send(err);
  }
};
