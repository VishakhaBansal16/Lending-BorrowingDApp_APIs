import express from "express";
import { borrowAsset } from "../controllers/borrowController.js";
export const borrow_route = express.Router();

borrow_route.route("/borrowAsset").post(borrowAsset);
