import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", AuthMiddleware.authenticate, PostController.createPost);
router.get("/", AuthMiddleware.authenticate, PostController.getPosts);
router.get("/:id", AuthMiddleware.authenticate, PostController.getPostById);
router.put("/:id", AuthMiddleware.authenticate, PostController.updatePost);
router.delete("/:id", AuthMiddleware.authenticate, PostController.deletePost);

export default router;
