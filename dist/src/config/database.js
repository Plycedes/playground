"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseConfig {
    static async connect() {
        try {
            const uri = process.env.MONGODB_URI;
            await mongoose_1.default.connect(uri);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        }
    }
    static async disconnect() {
        await mongoose_1.default.disconnect();
        console.log("Disconnected from MongoDB");
    }
}
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.js.map