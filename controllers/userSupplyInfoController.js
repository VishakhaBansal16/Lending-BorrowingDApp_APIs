import { initSupplyInfo } from "../scripts/userSupplyInfo.js";

export const supplyInfo = async (req, res) => {
  try {
    //Get user input
    const { asset, account } = req.query;
    if (!(asset, account)) {
      res.send("All inputs required");
    }

    const result = await initSupplyInfo(asset, account);

    if (!result) {
      res.send("Page not found");
    }

    res.send(result);
  } catch (err) {
    res.send("Txn obj not found");
  }
};
