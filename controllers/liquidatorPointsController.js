import { initLiquidatorPoints } from "../scripts/liquidatorPoints.js";
import { logger } from "../logger.js";

export const liquidatorPoints = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const liquidatorPoints = await initLiquidatorPoints(account);

    res.json({ liquidatorPoints });
  } catch (err) {
    logger.error(err);
    res.send("Points not found");
  }
};
