const Redis = require("ioredis");
const logger = require("@threadws/logger");

if (
  !process.env.REDIS_CONNECTION_STRING ||
  process.env.REDIS_CONNECTION_STRING === ""
) {
  throw new Error("No redis connection string has been supplied");
}

const isCluster = process.env.REDIS_MODE === "cluster";

let redis;

if (isCluster) {
  redis = new Redis.Cluster([process.env.REDIS_CONNECTION_STRING], {
    scaleReads: "slave"
  });
} else {
  redis = new Redis(process.env.REDIS_CONNECTION_STRING);
}

redis.select(process.env.REDIS_INDEX || 0, () => {
  logger.info(`REDIS: Selected Index: ${process.env.REDIS_INDEX || 0}`);
});

redis.on("error", err => {
  logger.error("REDIS: FAILED", { detail: { ...err } });
});

module.exports = redis;
