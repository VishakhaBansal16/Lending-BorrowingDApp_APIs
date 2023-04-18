import { initWithdrawableAmount } from "../scripts/withdrawableAmount.js";

export const withdrawableAmount = async (req, res) => {
  try {
    //Get user input
    const { account, asset, amount } = req.query;
    if (!(account, asset, amount)) {
      res.send("All inputs required");
    }

    const withdrawAccess = await initWithdrawableAmount(account, asset, amount);

    res.send(withdrawAccess);
  } catch (err) {
    res.send("Txn obj not found");
  }
};
