import createError from "http-errors";
import { initInitializeStorage } from "../scripts/initializeStorage.js";

export const initializeStorage = async (req, res, next) => {
  try {
    const serializedTransactionData = await initInitializeStorage();

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
