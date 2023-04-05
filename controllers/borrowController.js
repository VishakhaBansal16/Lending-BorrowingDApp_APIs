import { initBorrow } from "../scripts/borrow.js";

export const borrowAsset = async (req, res, next) => {
  try {
    //Get user input
    const { asset, amount, from } = req.body;
    if (!(asset, amount, from)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const unsignedTransactionObject = await initBorrow(asset, amount, from);

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
