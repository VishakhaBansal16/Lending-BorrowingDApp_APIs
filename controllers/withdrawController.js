import { initWithdraw } from "../scripts/withdraw.js";

export const withdrawAsset = async (req, res) => {
  try {
    //Get user input
    const { asset, amount } = req.body;
    if (!(asset, amount)) {
      res.send("All inputs required");
    }

    const unsignedTransactionObject = await initWithdraw(asset, amount);

    if (!unsignedTransactionObject) {
      res.send("Page not found");
    }

    res.send(unsignedTransactionObject);
  } catch (err) {
    res.send("Txn obj not found");
  }
};
