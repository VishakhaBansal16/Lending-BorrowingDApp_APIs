import { initSupplyBorrowAPR } from "../scripts/supply&BorrowAPR.js";

export const supplyborrowAPR = async (req, res) => {
  try {
    const result = await initSupplyBorrowAPR();

    if (!result) {
      res.send("Page not found");
    }

    res.send(result);
  } catch (err) {
    res.send("APR not found");
  }
};
