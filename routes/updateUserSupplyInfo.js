import express from "express";
import { updateSupplyInfo } from "../controllers/updateSupplyInfoController.js";
export const updateInfo_route = express.Router();

updateInfo_route.route("/updateSupplyInfo").put(updateSupplyInfo);
