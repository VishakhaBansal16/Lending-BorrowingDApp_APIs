import express from "express";
import { repayBorrow } from "../controllers/repayBorrowController.js";
export const repayBorrow_route = express.Router();

repayBorrow_route.route("/repayBorrow").post(repayBorrow);
