import express from "express";
import { userBalance } from "../controllers/userBalanceController.js";
export const userBalance_route = express.Router();

userBalance_route.route("/userBalance").get(userBalance);
