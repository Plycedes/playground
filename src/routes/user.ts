import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { UserSchema } from "../validators/UserValidators";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
    "/register",
    ValidationMiddleware.validate(UserSchema, "register"),
    asyncHandler(UserController.createUser),
);
router.post(
    "/login",
    ValidationMiddleware.validate(UserSchema, "login"),
    asyncHandler(UserController.login),
);
router.get("/profile", AuthMiddleware.authenticate, asyncHandler(UserController.getProfile));

export default router;
