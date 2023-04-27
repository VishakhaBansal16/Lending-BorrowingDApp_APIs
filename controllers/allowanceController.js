import { initAllowance } from "../scripts/allowance.js";
import { logger } from "../logger.js";

export const allowance = async (req, res) => {
  try {
    //Get user input
    const { owner, asset } = req.query;
    if (!(owner, asset)) {
      res.send("All inputs required");
    }

    const allowance = await initAllowance(owner, asset);

    res.json({ allowance });
  } catch (err) {
    logger.error(err);
    res.send("Allowance not found");
  }
};
