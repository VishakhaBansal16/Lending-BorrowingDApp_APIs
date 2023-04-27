import { BorrowInfo } from "../models/userBorrowInfoModel.js";
import { logger } from "../logger.js";

export const borrowInfo = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const filter = { account: account };
    const borrowInfo = await BorrowInfo.findOne(filter);

    if (borrowInfo) {
      const result = {
        "0xaad4992d949f9214458594df92b44165fb84dc19":
          borrowInfo.wbtcBorrowAmount,
        "0x42a71137c09ae83d8d05974960fd607d40033499":
          borrowInfo.wethBorrowAmount,
        "0xaf95ff5fb592646d86bf240b3cae0903b6e4dd38":
          borrowInfo.linkBorrowAmount,
      };
      res.json({ result });
    } else {
      const result = {
        "0xaad4992d949f9214458594df92b44165fb84dc19": 0,
        "0x42a71137c09ae83d8d05974960fd607d40033499": 0,
        "0xaf95ff5fb592646d86bf240b3cae0903b6e4dd38": 0,
      };
      res.json({ result });
    }
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
