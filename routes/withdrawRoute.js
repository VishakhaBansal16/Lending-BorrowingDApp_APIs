import express from "express";
import { withdrawAsset } from "../controllers/withdrawController.js";
export const withdraw_route = express.Router();

withdraw_route.route("/withdrawAsset").post(withdrawAsset);
