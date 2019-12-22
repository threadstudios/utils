const Redis = require("ioredis");

const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);
redisClient.select(process.env.REDIS_INDEX || 0);

module.exports = redisClient;
