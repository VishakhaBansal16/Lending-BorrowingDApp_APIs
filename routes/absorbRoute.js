import express from "express";
import { absorb } from "../controllers/absorbController.js";
export const absorb_route = express.Router();

absorb_route.route("/absorb").post(absorb);
