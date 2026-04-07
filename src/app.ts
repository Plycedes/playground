import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandler";
import { logger } from "./utils/logger";

const app = express();

app.set("trust proxy", 1);

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling
app.use(ErrorHandlerMiddleware.handle);

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;
