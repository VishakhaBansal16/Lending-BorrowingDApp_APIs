import express from "express";
import { borrowableAmount } from "../controllers/borrowableAmountController.js";
export const borrowableAmount_route = express.Router();

borrowableAmount_route.route("/borrowableAmount").get(borrowableAmount);
