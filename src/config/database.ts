import mongoose from "mongoose";

export class DatabaseConfig {
    static async connect(): Promise<void> {
        try {
            const uri = process.env.MONGODB_URI!;
            await mongoose.connect(uri);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        }
    }

    static async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}
