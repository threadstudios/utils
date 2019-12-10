const { APIException } = require("../index");

test("Api Exception", () => {
  try {
    throw new APIException({
      message: "An error occurred whilst validating your user",
      code: 422
    });
  } catch (e) {
    expect(e instanceof APIException).toEqual(true);
    expect(e.statusCode).toEqual(422);
  }
});
