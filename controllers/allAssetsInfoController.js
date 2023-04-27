import { initAllAssetsInfo } from "../scripts/allAssetsInfo.js";
import { logger } from "../logger.js";

export const allAssetsInfo = async (req, res) => {
  try {
    const result = await initAllAssetsInfo();

    if (!result) {
      res.send("Page not found");
    }

    res.send(result);
  } catch (err) {
    logger.error(err);
    res.send("Info not found");
  }
};
