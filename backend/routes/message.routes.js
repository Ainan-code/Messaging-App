import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import authenticateToken from "../middleware/protectRoute.js";


const router = express.Router();

router.get("/:id", authenticateToken , getMessages);
router.post("/send/:id", authenticateToken , sendMessage);






export default router;

