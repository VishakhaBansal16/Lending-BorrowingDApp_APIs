import dotenv from "dotenv/config";
import createError from "http-errors";
import { db } from "./db/database.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { supply_route } from "./routes/supplyRoute.js";
import { borrow_route } from "./routes/borrowRoute.js";
import { txStatus_route } from "./routes/transactionStatusRoute.js";
import { assetInfo_route } from "./routes/assetInfoRoute.js";
import { allAssetsInfo_route } from "./routes/allAssetsInfoRoute.js";
import { userBalance_route } from "./routes/userBalanceRoute.js";
import { approve_route } from "./routes/approveRoute.js";
import { allowance_route } from "./routes/allowanceRoute.js";
import { suppliedAsset_route } from "./routes/suppliedAssetRoute.js";
import { borrowedAsset_route } from "./routes/borrowedAssetRoute.js";

const app = express();
const port = process.env.API_PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());
app.use("/", supply_route);
app.use("/", borrow_route);
app.use("/", txStatus_route);
app.use("/", assetInfo_route);
app.use("/", allAssetsInfo_route);
app.use("/", userBalance_route);
app.use("/", approve_route);
app.use("/", allowance_route);
app.use("/", suppliedAsset_route);
app.use("/", borrowedAsset_route);
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

//error handler
app.use((err, req, res, next) => {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.status(404).json({
    status: "failed",
    message: "Page not found",
  });
  res.status(500).json({
    status: "failed",
    message: "Internal server error",
  });
});

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
