import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
router.get("/profile", AuthMiddleware.authenticate, UserController.getProfile);

export default router;
