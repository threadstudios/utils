const AppException = require("./src/AppException");
const AppError = require("./src/AppError");

function mapExceptionToResponse(exception) {
  if (exception instanceof AppError || exception instanceof AppException) {
    return {
      status: exception.statusCode,
      message: exception.message,
      detail: exception.detail
    };
  }
  return {
    status: 500,
    message: "An application error has occurred"
  };
}

module.exports = {
  AppException,
  AppError,
  mapExceptionToResponse
};
