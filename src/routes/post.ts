import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { AuthMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { PostSchema } from "../validators/PostValidators";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
    "/",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "create"),
    asyncHandler(PostController.createPost),
);
router.get("/", AuthMiddleware.authenticate, asyncHandler(PostController.getPosts));
router.get(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "getOne"),
    asyncHandler(PostController.getPostById),
);
router.put(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "update"),
    asyncHandler(PostController.updatePost),
);
router.delete(
    "/:id",
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PostSchema, "deleteOne"),
    asyncHandler(PostController.deletePost),
);

export default router;
