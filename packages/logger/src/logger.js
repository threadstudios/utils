const { createLogger, format, transports } = require("winston");

const { combine, timestamp, prettyPrint, printf } = format;

const environment = process.env.NODE_ENVIRONMENT;
const byEnv = env => {
  return {
    dev: "info",
    test: "warn",
    production: "error"
  }[env];
};

const defaultLevel = process.env.LOG_LEVEL || byEnv(environment) || "info";

module.exports = (level = defaultLevel) => {
  return createLogger({
    level,
    format:
      level === "info"
        ? combine(
            timestamp(),
            printf(info => {
              return `${info.timestamp} ${info.level}: ${info.message} ${
                info.detail ? JSON.stringify(info.detail, null, 2) : ""
              }`;
            })
          )
        : combine(timestamp(), prettyPrint()),
    transports: [new transports.Console()]
  });
};
