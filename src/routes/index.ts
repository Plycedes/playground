import express from "express";
import userRoutes from "./user";
import postRoutes from "./post";
import chatRoutes from "./chat";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/chats", chatRoutes);

export default router;
