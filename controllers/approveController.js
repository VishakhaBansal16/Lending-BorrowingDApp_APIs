import createError from "http-errors";
import { initApprove } from "../scripts/approve.js";

export const approve = async (req, res, next) => {
  try {
    //Get user input
    const { asset, value } = req.body;
    if (!value) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const unsignedTransactionObject = await initApprove(asset, value);

    if (!unsignedTransactionObject) {
      throw createError(404, "Not Found");
    }
    res.send(unsignedTransactionObject);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
