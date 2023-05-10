import express from "express";
import { liquidatedSupplyOrWithdraw } from "../controllers/liquidatedSupplyOrWithdrawController.js";
export const liquidatedSupplyOrWithdraw_route = express.Router();

liquidatedSupplyOrWithdraw_route
  .route("/liquidatedSupplyOrWithdraw")
  .post(liquidatedSupplyOrWithdraw);
