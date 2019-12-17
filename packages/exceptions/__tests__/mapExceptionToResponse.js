const { mapExceptionToResponse, AppError } = require("../index");

test("Handles an Api exception correctly", () => {
  try {
    throw new AppError({
      message: "A Teapot Happended",
      code: 418
    });
  } catch (e) {
    const res = mapExceptionToResponse(e);
    expect(res.status).toEqual(418);
  }
});

test("Handles any other exception gracefully", () => {
  try {
    throw new Error("Something else has gone wrong");
  } catch (e) {
    const res = mapExceptionToResponse(e);
    expect(res.status).toEqual(500);
  }
});
