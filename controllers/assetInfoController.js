import { initAssetInfo } from "../scripts/assetInfo.js";

export const assetInfo = async (req, res, next) => {
  try {
    //Get user input
    const { address } = req.query;
    if (!address) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }

    const result = await initAssetInfo(address);

    if (!result) {
      throw createError(404, "Not Found");
    }

    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
