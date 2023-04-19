import createError from "http-errors";
import { initRepayBorrow } from "../scripts/repayBorrow.js";

export const repayBorrow = async (req, res) => {
  //  try {
  //Get user input
  const { baseAsset, amount } = req.body;
  if (!(baseAsset, amount)) {
    res.send("All inputs required");
  }

  const unsignedTransactionObject = await initRepayBorrow(baseAsset, amount);

  if (!unsignedTransactionObject) {
    res.send("Page not found");
  }

  res.send(unsignedTransactionObject);
  /* } catch (err) {
    res.send("Txn obj not found");
  }*/
};
