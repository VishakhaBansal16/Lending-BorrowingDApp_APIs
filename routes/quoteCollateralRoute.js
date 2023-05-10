import express from "express";
import { collateral } from "../controllers/quoteCollateralController.js";
export const quoteCollateral_route = express.Router();
quoteCollateral_route.route("/quoteCollateral").get(collateral);
