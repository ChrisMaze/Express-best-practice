import winston from "winston";
import "winston-daily-rotate-file";
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = "debug";
// const level = () => {
//   const env = process.env.NODE_ENV || "development";
//   const isDevelopment = env === "development";
//   return isDevelopment ? "debug" : "warn";
// };

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
  // winston.format.printf((error)=>`${error.timestamp} ${error.level}: ${error.message}`)
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile({
    filename: "logs/error-%DATE%.log",
    level: "error",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    maxSize: "2m",
  }),
  new winston.transports.DailyRotateFile({
    filename: "logs/all-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    maxSize: "2m",
  }),
  new winston.transports.DailyRotateFile({
    filename: "logs/http-%DATE%.log",
    level: "http",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    maxSize: "2m",
  }),
];

const logger = winston.createLogger({
  level: level,
  levels,
  format,
  transports,
});

export default logger;
