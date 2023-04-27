import { TokenInfo } from "../models/userTokenInfoModel.js";
import { logger } from "../logger.js";

export const supplyInfo = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("All inputs required");
    }

    const filter = { account: account };
    const tokenInfo = await TokenInfo.findOne(filter);

    if (tokenInfo) {
      const result = {
        compSupplyAmount: tokenInfo.compSupplyAmount,
        wbtcSupplyAmount: tokenInfo.wbtcSupplyAmount,
        wethSupplyAmount: tokenInfo.wethSupplyAmount,
        linkSupplyAmount: tokenInfo.linkSupplyAmount,
      };
      res.json({ result });
    } else {
      const result = {
        compSupplyAmount: 0,
        wbtcSupplyAmount: 0,
        wethSupplyAmount: 0,
        linkSupplyAmount: 0,
      };
      res.json({ result });
    }
  } catch (err) {
    logger.error(err);
    res.send("Txn object not found");
  }
};
