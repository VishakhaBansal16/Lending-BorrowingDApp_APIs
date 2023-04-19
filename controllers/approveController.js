import createError from "http-errors";
import { initApprove } from "../scripts/approve.js";

export const approve = async (req, res) => {
  // try {
  //Get user input
  const { asset, value } = req.body;

  if (!(asset, value)) {
    res.send("All inputs required");
  }

  const unsignedTransactionObject = await initApprove(asset, value);

  if (!unsignedTransactionObject) {
    res.send("Page not found");
  }
  res.send(unsignedTransactionObject);
  /*} catch (err) {
    res.send("Txn obj not found");
  }*/
};
