"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middlewares/auth");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const UserValidators_1 = require("../validators/UserValidators");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.post("/register", ValidationMiddleware_1.ValidationMiddleware.validate(UserValidators_1.UserSchema, "register"), (0, asyncHandler_1.asyncHandler)(UserController_1.UserController.createUser));
router.post("/login", ValidationMiddleware_1.ValidationMiddleware.validate(UserValidators_1.UserSchema, "login"), (0, asyncHandler_1.asyncHandler)(UserController_1.UserController.login));
router.get("/profile", auth_1.AuthMiddleware.authenticate, (0, asyncHandler_1.asyncHandler)(UserController_1.UserController.getProfile));
exports.default = router;
//# sourceMappingURL=user.js.map