import express from "express";
import { buyCollateral } from "../controllers/buyCollateralController.js";
export const buyCollateral_route = express.Router();

buyCollateral_route.route("/buyCollateral").post(buyCollateral);
