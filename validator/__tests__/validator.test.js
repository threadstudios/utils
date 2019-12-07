const { isValid } = require("../index");

describe("Validator", () => {
  test("It should validate a simple object", () => {
    const schema = {
      title: "isRequired",
      email: "isRequired|isEmail"
    };

    const result = isValid(schema, {
      title: "Test",
      email: "paul"
    });

    expect(result.errorFields.email).toBe(true);
    expect(result.fields.title).toBe(true);
    expect(result.fields.email).toBe(false);
    expect(result.isValid).toBe(false);
  });
});
