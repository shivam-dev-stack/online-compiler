import express from "express";
import { login,logout } from "../controller/admin.js";
import { api } from "../config/config.js";

const adminRouter = express.Router();
adminRouter.route(`${api.admin.full}${api.admin.login}`).get(login);
adminRouter.route(`${api.admin.full}${api.admin.logout}`).get(logout);


export {adminRouter};