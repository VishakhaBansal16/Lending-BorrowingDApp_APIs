import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "your-service-name" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
/*
import { createLogger, format, transports } from "winston";

export const logger = () => {
  // creating logger
  return createLogger({
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    defaultMeta: { service: "default" },
    transports: [
      new transports.Console({ level: "debug" }),
      new transports.File({ filename: "error.log", level: "error" }),
    ],
  });
};
*/
