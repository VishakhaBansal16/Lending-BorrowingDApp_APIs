import express from "express";
import { allCollateralReserves } from "../controllers/allCollateralReservesController.js";
export const allCollateralReserves_route = express.Router();
allCollateralReserves_route
  .route("/allCollateralReserves")
  .get(allCollateralReserves);
