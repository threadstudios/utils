const logger = require("@threadws/logger");

class AppException extends Error {
  constructor(obj) {
    super(obj.message);
    this.name = this.constructor.name;
    this.statusCode = 500;
    this.details = obj.details || false;
    Error.captureStackTrace(this, this.constructor);
    logger.error(obj.message, {
      detail: { ...obj.details, code: obj.code, stack: obj.stack }
    });
  }
}

module.exports = AppException;
