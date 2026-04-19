import mongoose from "mongoose";

export class DatabaseConfig {
    private static isConnecting = false;

    static async connect(): Promise<void> {
        if (this.isConnecting) return;

        this.isConnecting = true;

        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI is missing");
            return;
        }

        const connectWithRetry = async () => {
            try {
                await mongoose.connect(uri);
                console.log("Connected to MongoDB");
            } catch (error) {
                console.error("MongoDB connection error, retrying...", error);
                setTimeout(connectWithRetry, 5000);
            }
        };

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected. Reconnecting...");
            connectWithRetry();
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB error:", err);
        });

        await connectWithRetry();
    }

    static async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }

    static isReady(): boolean {
        return mongoose.connection.readyState === 1;
    }
}
