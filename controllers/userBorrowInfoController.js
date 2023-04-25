import { BorrowInfo } from "../models/userBorrowInfoModel.js";

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
        borrowAmount: borrowInfo.borrowAmount,
        lastAccureTime: borrowInfo.lastAccureTime,
        interestAmount: borrowInfo.interestAmount,
      };
      res.send(result);
    } else {
      res.send("Borrow info not found in database");
    }
  } catch (err) {
    res.send("Txn obj not found");
  }
};
