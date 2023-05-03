import express from "express";
import { balanceOf } from "../controllers/balanceOfController.js";
export const balanceOf_route = express.Router();

balanceOf_route.route("/balanceOf").get(balanceOf);
