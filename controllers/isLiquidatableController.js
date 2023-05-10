import { initLiquidationStatus } from "../scripts/isLiquidatable.js";
import { logger } from "../logger.js";

export const liquidationStatus = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const status = await initLiquidationStatus(account);

    res.json({ status });
  } catch (err) {
    logger.error(err);
    res.send("Status not found");
  }
};
