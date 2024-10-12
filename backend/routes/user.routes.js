import express from "express";
import authenticateToken from "../middleware/protectRoute.js";
import { getUsers } from "../controllers/user.controller.js";


const router  = express.Router();

 router.get("/", authenticateToken, getUsers);


export default router;

