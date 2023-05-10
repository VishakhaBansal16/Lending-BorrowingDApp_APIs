import express from "express";
import { collateralReserves } from "../controllers/collateralReservesController.js";
export const collateralReserves_route = express.Router();
collateralReserves_route.route("/collateralReserves").get(collateralReserves);
