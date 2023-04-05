import createError from "http-errors";
import { initApprove } from "../scripts/approve.js";

export const approve = async (req, res, next) => {
  try {
    //Get user input
    const { spender, value } = req.body;
    if (!(spender, value)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const unsignedTransactionObject = await initApprove(spender, value);

    if (!unsignedTransactionObject) {
      throw createError(404, "Not Found");
    }

    res.status(201).json({
      unsignedTransactionObject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
