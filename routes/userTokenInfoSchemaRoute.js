import express from "express";
import { tokenInfo } from "../controllers/userTokenInfoSchemaController.js";
export const tokenInfoSchema_route = express.Router();

tokenInfoSchema_route.route("/userTokenInfoSchema").post(tokenInfo);
