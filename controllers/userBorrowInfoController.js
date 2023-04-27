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
        wbtcBorrowAmount: borrowInfo.wbtcBorrowAmount,
        wethBorrowAmount: borrowInfo.wethBorrowAmount,
        linkBorrowAmount: borrowInfo.linkBorrowAmount,
      };
      res.json({ result });
    } else {
      const result = {
        wbtcBorrowAmount: 0,
        wethBorrowAmount: 0,
        linkBorrowAmount: 0,
      };
      res.json({ result });
    }
  } catch (err) {
    logger.error(err);
    res.send("Txn obj not found");
  }
};
