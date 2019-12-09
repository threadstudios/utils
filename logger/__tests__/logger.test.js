const stdMocks = require("std-mocks");
const relaxedJSON = require("relaxed-json");
const loggerInit = require("../src/logger");

function bootstrapTest(testFn) {
  stdMocks.use();
  testFn();
  stdMocks.restore();
  return stdMocks.flush();
}

test("A simple logging test", () => {
  const logger = loggerInit("info");
  const result = bootstrapTest(() => {
    logger.info("A Test", { detail: { message: "Something has gone wrong" } });
  });
  const firstLine = result.stdout[0];
  expect(
    firstLine.includes("A Test") &&
      firstLine.includes("Something has gone wrong")
  ).toEqual(true);
});

test("Elevated level of logging", () => {
  const logger = loggerInit("error");
  const result = bootstrapTest(() => {
    logger.error("An Error", { detail: { message: "An error has occured" } });
  });
  const firstLine = relaxedJSON.parse(result.stdout[0]);
  expect(firstLine.level).toEqual("error");
  expect(firstLine.detail.message).toEqual("An error has occured");
});
