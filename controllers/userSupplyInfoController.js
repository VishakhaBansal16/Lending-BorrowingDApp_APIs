import { TokenInfo } from "../models/userSupplyInfoModel.js";
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
        "0x3587b2f7e0e2d6166d6c14230e7fe160252b0ba4":
          tokenInfo.compSupplyAmount,
        "0xaad4992d949f9214458594df92b44165fb84dc19":
          tokenInfo.wbtcSupplyAmount,
        "0x42a71137c09ae83d8d05974960fd607d40033499":
          tokenInfo.wethSupplyAmount,
        "0xaf95ff5fb592646d86bf240b3cae0903b6e4dd38":
          tokenInfo.linkSupplyAmount,
        "0x07865c6E87B9F70255377e024ace6630C1Eaa37F":
          tokenInfo.usdcSupplyAmount,
      };
      res.json({ result });
    } else {
      const result = {
        "0x3587b2f7e0e2d6166d6c14230e7fe160252b0ba4": 0,
        "0xaad4992d949f9214458594df92b44165fb84dc19": 0,
        "0x42a71137c09ae83d8d05974960fd607d40033499": 0,
        "0xaf95ff5fb592646d86bf240b3cae0903b6e4dd38": 0,
        "0x07865c6E87B9F70255377e024ace6630C1Eaa37F": 0,
      };
      res.json({ result });
    }
  } catch (err) {
    logger.error(err);
    res.send("Txn object not found");
  }
};
