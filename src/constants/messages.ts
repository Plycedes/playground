export const ERROR_MESSAGES = {
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid credentials",
    USER_ALREADY_EXISTS: "User already exists",
    UNAUTHORIZED: "Unauthorized access",
    INVALID_TOKEN: "Invalid token",
    TOKEN_EXPIRED: "Token expired",
    INTERNAL_SERVER_ERROR: "Internal server error",
    VALIDATION_ERROR: "Validation error",
    POST_NOT_FOUND: "Post not found",
} as const;

export const SUCCESS_MESSAGES = {
    USER_CREATED: "User created successfully",
    LOGIN_SUCCESSFUL: "Login successful",
    LOGOUT_SUCCESSFUL: "Logout successful",
    POST_CREATED: "Post created successfully",
    POST_UPDATED: "Post updated successfully",
    POST_DELETED: "Post deleted successfully",
} as const;
