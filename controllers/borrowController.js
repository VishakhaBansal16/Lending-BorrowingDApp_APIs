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

    const serializedTransactionData = await initBorrow(asset, amount, from);

    if (!serializedTransactionData) {
      throw createError(404, "Not Found");
    }

    res.status(201).json({
      serializedTransactionData,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
