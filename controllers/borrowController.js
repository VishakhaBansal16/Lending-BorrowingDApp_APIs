import { initBorrow } from "../scripts/borrow.js";

export const borrowAsset = async (req, res, next) => {
  try {
    //Get user input
    const { asset, amount } = req.body;
    if (!(asset, amount)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const unsignedTransactionObject = await initBorrow(asset, amount);

    if (!unsignedTransactionObject) {
      throw createError(404, "Not Found");
    }

    res.status(201).send(unsignedTransactionObject);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
