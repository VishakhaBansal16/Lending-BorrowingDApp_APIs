import express from "express";
import { transactionStatus } from "../controllers/txStatusController.js";
export const txStatus_route = express.Router();

txStatus_route.route("/transactionStatus").get(transactionStatus);
