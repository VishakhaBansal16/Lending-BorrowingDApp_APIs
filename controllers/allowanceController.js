import createError from "http-errors";
import { initAllowance } from "../scripts/allowance.js";

export const allowance = async (req, res, next) => {
  try {
    //Get user input
    const { owner, asset } = req.query;
    if (!(owner, asset)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const allowance = await initAllowance(owner, asset);

    res.status(201).send(allowance);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
