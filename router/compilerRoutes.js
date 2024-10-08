import express from "express";
import { compiler,run } from "../controller/compiler.js";

const router = express.Router();
router.route("").get(compiler);
router.route("/run").post(run);

export {router};