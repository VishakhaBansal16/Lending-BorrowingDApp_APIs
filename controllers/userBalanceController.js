import { initBalance } from "../scripts/userBalance.js";

export const userBalance = async (req, res) => {
  try {
    //Get user input
    const { address } = req.query;
    if (!address) {
      res.send("An input required");
    }

    const userBalance = await initBalance(address);

    if (!userBalance) {
      res.send("Page not found");
    }

    res.json({ userBalance });
  } catch (err) {
    res.send("User assets balance not found");
  }
};
