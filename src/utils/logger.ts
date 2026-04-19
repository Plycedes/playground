import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    defaultMeta: { service: "ts-mongodb-server" },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

export { logger };
