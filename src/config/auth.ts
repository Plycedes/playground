export const JWT_CONFIG = {
    SECRET: process.env.JWT_SECRET!,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
} as const;

export const BCRYPT_CONFIG = {
    ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || "12"),
} as const;
