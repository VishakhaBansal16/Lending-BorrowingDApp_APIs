import { TokenInfo } from "../models/userSupplyInfoModel.js";
import { logger } from "../logger.js";

export const updateSupplyInfo = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("All inputs required");
    }

    const filter = { account: account };
    const supplyInfo = await TokenInfo.findOne(filter);

    if (supplyInfo) {
      const update = {
        $set: {
          compSupplyAmount: 0,
          wbtcSupplyAmount: 0,
          wethSupplyAmount: 0,
          linkSupplyAmount: 0,
          usdcSupplyAmount: 0,
        },
      };
      const results = await TokenInfo.updateOne(filter, update);
      res.json(results);
    }
  } catch (err) {
    logger.error(err);
    res.send("Txn object not found");
  }
};
