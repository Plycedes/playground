import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/:roomId/messages", AuthMiddleware.authenticate, ChatController.sendMessage);
router.get("/:roomId/messages", AuthMiddleware.authenticate, ChatController.readMessages);

export default router;
