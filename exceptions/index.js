const AppException = require("./src/AppException");

function mapExceptionToResponse(exception) {
  if (exception instanceof AppException) {
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
  mapExceptionToResponse
};
