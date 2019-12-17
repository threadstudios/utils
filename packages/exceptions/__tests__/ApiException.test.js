const { AppError } = require("../index");

test("Api Exception", () => {
  try {
    throw new AppError({
      message: "An error occurred whilst validating your user",
      code: 422
    });
  } catch (e) {
    expect(e instanceof AppError).toEqual(true);
    expect(e.statusCode).toEqual(422);
  }
});
