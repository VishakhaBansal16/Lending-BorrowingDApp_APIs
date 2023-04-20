import createError from "http-errors";
import { initBorrowBalance } from "../scripts/borrowBalance.js";

export const borrowBalance = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const balance = await initBorrowBalance(account);

    res.json({ balance });
  } catch (err) {
    res.send("Balance not found");
  }
};
