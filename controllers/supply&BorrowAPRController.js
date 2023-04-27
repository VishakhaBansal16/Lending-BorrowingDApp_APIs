import { initSupplyBorrowAPR } from "../scripts/supply&BorrowAPR.js";
import { logger } from "../logger.js";

export const supplyborrowAPR = async (req, res) => {
  try {
    const result = await initSupplyBorrowAPR();

    if (!result) {
      res.send("Page not found");
    }

    res.send(result);
  } catch (err) {
    logger.error(err);
    res.send("APR not found");
  }
};
