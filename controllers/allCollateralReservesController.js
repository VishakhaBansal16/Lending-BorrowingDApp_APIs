import { initAllCollateralReserves } from "../scripts/allCollateralReserves.js";
import { logger } from "../logger.js";

export const allCollateralReserves = async (req, res) => {
  try {
    const reserves = await initAllCollateralReserves();
    res.json({ reserves });
  } catch (err) {
    logger.error(err);
    res.send("Reserves not found");
  }
};
