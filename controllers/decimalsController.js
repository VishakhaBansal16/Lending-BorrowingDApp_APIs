import createError from "http-errors";
import { initDecimals } from "../scripts/decimals.js";

export const decimals = async (req, res) => {
  try {
    //Get user input
    const { asset } = req.query;
    if (!asset) {
      res.send("An input required");
    }

    const decimals = await initDecimals(asset);

    res.json({ decimals });
  } catch (err) {
    res.send("Decimals not found");
  }
};
