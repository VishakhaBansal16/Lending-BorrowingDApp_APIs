import createError from "http-errors";
import { initBalance } from "../scripts/userBalance.js";

export const userBalance = async (req, res, next) => {
  try {
    //Get user input
    const { address } = req.query;
    if (!address) {
      res.status(400).json({
        status: "failed",
        message: "An input is required",
      });
    }

    const userBalance = await initBalance(address);

    if (!userBalance) {
      throw createError(404, "Not Found");
    }

    res.status(201).json({
      userBalance,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
