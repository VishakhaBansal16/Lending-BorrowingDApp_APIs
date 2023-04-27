import { initAssetInfo } from "../scripts/assetInfo.js";
import { logger } from "../logger.js";

export const assetInfo = async (req, res) => {
  try {
    //Get user input
    const { address } = req.query;
    if (!address) {
      res.send("An input required");
    }

    const result = await initAssetInfo(address);

    if (!result) {
      res.send("Page not found");
    }

    res.send(result);
  } catch (err) {
    logger.error(err);
    res.send("Info not found");
  }
};
