import express from "express";
import { borrowInfo } from "../controllers/userBorrowInfoSchemaController.js";
export const borrowInfoSchema_route = express.Router();

borrowInfoSchema_route.route("/userBorrowInfoSchema").post(borrowInfo);
