import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { ChatSchema } from "../validators/ChatValidators";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
    "/",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "create"),
    asyncHandler(ChatController.createChat),
);
router.post(
    "/:id/join",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "join"),
    asyncHandler(ChatController.joinChat),
);
router.post(
    "/:id/leave",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "leave"),
    asyncHandler(ChatController.leaveChat),
);
router.get("/", AuthMiddleware.authenticate, asyncHandler(ChatController.getChats));
router.get(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "getOne"),
    asyncHandler(ChatController.getChatById),
);
router.post(
    "/:roomId/messages",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "sendMessage"),
    asyncHandler(ChatController.sendMessage),
);
router.get(
    "/:roomId/messages",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChatSchema, "readMessages"),
    asyncHandler(ChatController.readMessages),
);

export default router;
