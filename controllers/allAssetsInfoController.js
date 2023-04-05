import { initAllAssetsInfo } from "../scripts/allAssetsInfo.js";

export const allAssetsInfo = async (req, res, next) => {
  try {
    const result = await initAllAssetsInfo();

    if (!result) {
      throw createError(404, "Not Found");
    }

    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
