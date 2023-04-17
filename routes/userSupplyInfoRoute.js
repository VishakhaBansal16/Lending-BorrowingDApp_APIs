import express from "express";
import { supplyInfo } from "../controllers/userSupplyInfoController.js";
export const supplyInfo_route = express.Router();

supplyInfo_route.route("/userSupplyInfo").get(supplyInfo);
