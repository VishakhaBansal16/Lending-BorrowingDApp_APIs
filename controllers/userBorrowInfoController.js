import { initBorrowInfo } from "../scripts/userBorrowInfo.js";

export const borrowInfo = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("An input required");
    }

    const result = await initBorrowInfo(account);

    if (!result) {
      res.send("Page not found");
    }

    res.json({ result });
  } catch (err) {
    res.send("Txn obj not found");
  }
};
