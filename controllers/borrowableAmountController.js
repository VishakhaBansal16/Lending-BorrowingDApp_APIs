import { initBorrowableAmount } from "../scripts/borrowableAmount.js";

export const borrowableAmount = async (req, res) => {
  try {
    //Get user input
    const { account } = req.query;
    if (!account) {
      res.send("All inputs required");
    }

    const borrowableAmount = await initBorrowableAmount(account);

    res.json({ borrowableAmount });
  } catch (err) {
    res.send("Txn obj not found");
  }
};
