const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint } = format;

const threadLogger = level =>
  createLogger({
    level,
    format: combine(timestamp(), prettyPrint()),
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
exportLogger[level](`Logging at ${level}`);
module.exports = exportLogger;
