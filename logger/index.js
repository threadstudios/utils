const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, printf } = format;

const threadLogger = level =>
  createLogger({
    level,
    format:
      level === "info"
        ? combine(
            timestamp(),
            printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
          )
        : combine(timestamp(), prettyPrint()),
    transports: [new transports.Console()]
  });

const environment = process.env.NODE_ENVIRONMENT;
const byEnv = env => {
  return {
    dev: "info",
    test: "warn",
    production: "error"
  }[env];
};

const level = process.env.LOG_LEVEL || byEnv(environment) || "info";
const exportLogger = threadLogger(level);
module.exports = exportLogger;
