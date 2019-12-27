const logger = require("@threadws/logger");

class AppError extends Error {
  constructor(obj) {
    super(obj.message);
    this.name = this.constructor.name;
    this.statusCode = obj.code || 500;
    this.details = obj.details || false;
    Error.captureStackTrace(this, this.constructor);
    logger.info(obj.message, {
      detail: { ...obj.details, code: obj.code, stack: obj.stack }
    });
  }
}

module.exports = AppError;
