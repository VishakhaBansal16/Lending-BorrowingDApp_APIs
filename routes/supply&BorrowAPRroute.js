import express from "express";
import { supplyborrowAPR } from "../controllers/supply&BorrowAPRController.js";
export const APR_route = express.Router();

APR_route.route("/supply&BorrowAPR").get(supplyborrowAPR);
