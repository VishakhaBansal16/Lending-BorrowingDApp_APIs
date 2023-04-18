import express from "express";
import { borrowInfo } from "../controllers/userBorrowInfoController.js";
export const borrowInfo_route = express.Router();

borrowInfo_route.route("/userBorrowInfo").get(borrowInfo);
