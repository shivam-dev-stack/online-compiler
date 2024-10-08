import express from "express";
import { compiler } from "../controller/compiler.js";

const router = express.Router();
router.route("").get(compiler);

export {router};