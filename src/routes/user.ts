import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { UserSchema } from "../validators/UserValidators";

const router = Router();

router.post(
    "/register",
    ValidationMiddleware.validate(UserSchema, "register"),
    UserController.createUser,
);
router.post("/login", ValidationMiddleware.validate(UserSchema, "login"), UserController.login);
router.get("/profile", AuthMiddleware.authenticate, UserController.getProfile);

export default router;
