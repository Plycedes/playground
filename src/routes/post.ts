import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { PostSchema } from "../validators/PostValidators";

const router = Router();

router.post(
    "/",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "create"),
    PostController.createPost,
);
router.get("/", AuthMiddleware.authenticate, PostController.getPosts);
router.get(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "getOne"),
    PostController.getPostById,
);
router.put(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "update"),
    PostController.updatePost,
);
router.delete(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "deleteOne"),
    PostController.deletePost,
);

export default router;
