import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { ChatSchema } from "../validators/ChatValidators";

const router = Router();

router.post(
    "/:roomId/messages",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "sendMessage"),
    ChatController.sendMessage,
);
router.get(
    "/:roomId/messages",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "readMessages"),
    ChatController.readMessages,
);

export default router;
