import express from "express";
import { liquidationStatus } from "../controllers/isLiquidatableController.js";
export const isLiquidatable_route = express.Router();
isLiquidatable_route.route("/isLiquidatable").get(liquidationStatus);
