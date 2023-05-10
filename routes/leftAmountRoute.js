import express from "express";
import { leftAmount } from "../controllers/leftAmountController.js";
export const leftAmount_route = express.Router();

leftAmount_route.route("/leftAmount").get(leftAmount);
