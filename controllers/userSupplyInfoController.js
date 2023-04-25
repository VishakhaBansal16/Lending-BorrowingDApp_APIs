import { TokenInfo } from "../models/userTokenInfoModel.js";

export const supplyInfo = async (req, res) => {
  try {
    //Get user input
    const { asset, account } = req.query;
    if (!(asset, account)) {
      res.send("All inputs required");
    }

    const filter = { asset: asset, account: account };
    const tokenInfo = await TokenInfo.findOne(filter);

    if (tokenInfo) {
      const result = {
        depositAmount: tokenInfo.depositAmount,
        supplyAmount: tokenInfo.supplyAmount,
        lastAccureTime: tokenInfo.lastAccureTime,
      };
      res.json({ result });
    } else {
      const result = {
        depositAmount: 0,
        supplyAmount: 0,
        lastAccureTime: 0,
      };
      res.json({ result });
    }
  } catch (err) {
    res.send("Txn object not found");
  }
};
