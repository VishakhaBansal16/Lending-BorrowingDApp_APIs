import createError from "http-errors";
import { TokenInfo } from "../models/userTokenInfoModel.js";
import { initTokenInfoSchema } from "../scripts/userTokenInfoSchema.js";
export const tokenInfo = async (req, res) => {
  try {
    //Get user input
    const { asset, account } = req.body;
    if (!(asset, account)) {
      res.send("All inputs required");
    }

    const details = await initTokenInfoSchema(asset, account);
    // Create userTokenInfo details entry in database
    const entry = await TokenInfo.create({
      asset,
      account,
      depositAmount: details.depositAmount,
      supplyAmount: details.supplyAmount,
      lastAccureTime: details.lastAccureTime,
    });

    res.send(entry);
  } catch (err) {
    res.send("Details not stored");
  }
};
