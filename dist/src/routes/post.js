"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const auth_1 = require("../middlewares/auth");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const PostValidators_1 = require("../validators/PostValidators");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.post("/", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(PostValidators_1.PostSchema, "create"), (0, asyncHandler_1.asyncHandler)(PostController_1.PostController.createPost));
router.get("/", auth_1.AuthMiddleware.authenticate, (0, asyncHandler_1.asyncHandler)(PostController_1.PostController.getPosts));
router.get("/:id", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(PostValidators_1.PostSchema, "getOne"), (0, asyncHandler_1.asyncHandler)(PostController_1.PostController.getPostById));
router.put("/:id", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(PostValidators_1.PostSchema, "update"), (0, asyncHandler_1.asyncHandler)(PostController_1.PostController.updatePost));
router.delete("/:id", auth_1.AuthMiddleware.authenticate, ValidationMiddleware_1.ValidationMiddleware.validate(PostValidators_1.PostSchema, "deleteOne"), (0, asyncHandler_1.asyncHandler)(PostController_1.PostController.deletePost));
exports.default = router;
//# sourceMappingURL=post.js.map