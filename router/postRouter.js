import express from "express";
import { postExample, getExample} from "../controller/postExample.js";
import isAuthenticated from "../isAuth.js"
import { api } from "../config/config.js";


const postRoutes = express.Router();
postRoutes.route(api.post.send).post(isAuthenticated,postExample);
postRoutes.route(api.post.receive).get(getExample);
export {postRoutes};