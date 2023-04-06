import express from "express";
import { allowance } from "../controllers/allowanceController.js";
export const allowance_route = express.Router();

allowance_route.route("/allowance").get(allowance);
