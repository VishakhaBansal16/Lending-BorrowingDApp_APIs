import { initCollateralReserves } from "../scripts/collateralReserves.js";
import { logger } from "../logger.js";

export const collateralReserves = async (req, res) => {
  try {
    //Get user input
    const { asset } = req.query;
    if (!asset) {
      res.send("An input required");
    }

    const reserve = await initCollateralReserves(asset);

    res.json({ reserve });
  } catch (err) {
    logger.error(err);
    res.send("Reserve not found");
  }
};
