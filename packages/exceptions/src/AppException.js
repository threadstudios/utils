class AppException extends Error {
  constructor(obj) {
    super(obj.message);
    this.name = this.constructor.name;
    this.statusCode = obj.code || 500;
    this.details = obj.details || false;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppException;
