import express from "express";
import { withdrawableAmount } from "../controllers/withdrawableAmountController.js";
export const withdrawableAmount_route = express.Router();

withdrawableAmount_route.route("/withdrawableAmount").get(withdrawableAmount);
