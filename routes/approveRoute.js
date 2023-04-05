import express from "express";
import { approve } from "../controllers/approveController.js";
export const approve_route = express.Router();

approve_route.route("/approve").post(approve);
