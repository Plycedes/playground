import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { ChatSchema } from "../validators/ChatValidators";

const router = Router();

router.post(
    "/",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "create"),
    ChatController.createChat,
);
router.post(
    "/:id/join",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "join"),
    ChatController.joinChat,
);
router.post(
    "/:id/leave",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "leave"),
    ChatController.leaveChat,
);
router.get("/", AuthMiddleware.authenticate, ChatController.getChats);
router.get(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "getOne"),
    ChatController.getChatById,
);
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
