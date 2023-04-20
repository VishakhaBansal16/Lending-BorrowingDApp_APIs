import express from "express";
import { borrowBalance } from "../controllers/getBorrowBalanceOfController.js";
export const borrowBalance_route = express.Router();

borrowBalance_route.route("/getBorrowBalanceOf").get(borrowBalance);
