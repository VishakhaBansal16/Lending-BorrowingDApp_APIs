import express from "express";
import { transactionDetails } from "../controllers/txnDetailsSchemaController.js";
export const txnDetails_route = express.Router();

txnDetails_route.route("/transactionDetails").post(transactionDetails);
