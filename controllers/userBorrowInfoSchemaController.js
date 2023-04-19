import createError from "http-errors";
import { BorrowInfo } from "../models/userBorrowInfoModel.js";
import { initBorrowInfoSchema } from "../scripts/userBorrowInfoSchema.js";
export const borrowInfo = async (req, res) => {
  try {
    //Get user input
    const { account } = req.body;
    if (!account) {
      res.send("All inputs required");
    }

    const details = await initBorrowInfoSchema(account);
    // Create userBorrowInfo details entry in database
    const entry = await BorrowInfo.create({
      account,
      borrowAmount: details.borrowAmount,
      lastAccureTime: details.lastAccureTime,
      interestAmount: details.interestAmount,
    });

    res.send(entry);
  } catch (err) {
    res.send("Details not stored");
  }
};
