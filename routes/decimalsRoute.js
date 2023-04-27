import express from "express";
import { decimals } from "../controllers/decimalsController.js";
export const decimals_route = express.Router();

decimals_route.route("/decimals").get(decimals);
