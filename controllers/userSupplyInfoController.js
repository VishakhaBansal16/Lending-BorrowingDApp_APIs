import { TokenInfo } from "../models/userTokenInfoModel.js";

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
        wbtcSupplyAmount: tokenInfo.wbtcSupplyAmount,
        wethSupplyAmount: tokenInfo.wethSupplyAmount,
        linkSupplyAmount: tokenInfo.linkSupplyAmount,
      };
      res.json({ result });
    } else {
      const result = {
        wbtcSupplyAmount: 0,
        wethSupplyAmount: 0,
        linkSupplyAmount: 0,
      };
      res.json({ result });
    }
  } catch (err) {
    res.send("Txn object not found");
  }
};
