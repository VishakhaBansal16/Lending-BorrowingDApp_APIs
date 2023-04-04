import express from "express";
import { supplyAsset } from "../controllers/supplyController.js";
export const supply_route = express.Router();

supply_route.route("/supplyAsset").post(supplyAsset);
