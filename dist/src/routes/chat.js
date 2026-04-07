"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = require("../controllers/ChatController");
const auth_1 = require("../middlewares/auth");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const ChatValidators_1 = require("../validators/ChatValidators");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.post("/", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(ChatValidators_1.ChatSchema, "create"), (0, asyncHandler_1.asyncHandler)(ChatController_1.ChatController.createChat));
router.post("/:id/join", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(ChatValidators_1.ChatSchema, "join"), (0, asyncHandler_1.asyncHandler)(ChatController_1.ChatController.joinChat));
router.post("/:id/leave", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(ChatValidators_1.ChatSchema, "leave"), (0, asyncHandler_1.asyncHandler)(ChatController_1.ChatController.leaveChat));
router.get("/", auth_1.AuthMiddleware.authenticate, (0, asyncHandler_1.asyncHandler)(ChatController_1.ChatController.getChats));
router.get("/:id", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(ChatValidators_1.ChatSchema, "getOne"), (0, asyncHandler_1.asyncHandler)(ChatController_1.ChatController.getChatById));
router.post("/:roomId/messages", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(ChatValidators_1.ChatSchema, "sendMessage"), (0, asyncHandler_1.asyncHandler)(ChatController_1.ChatController.sendMessage));
router.get("/:roomId/messages", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(ChatValidators_1.ChatSchema, "readMessages"), (0, asyncHandler_1.asyncHandler)(ChatController_1.ChatController.readMessages));
exports.default = router;
//# sourceMappingURL=chat.js.map