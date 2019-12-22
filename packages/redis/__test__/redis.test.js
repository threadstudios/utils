const redis = require("../index");

test("It should return a connected redis instance", async done => {
  await redis.set("__test__", "ok");
  const testVal = await redis.get("__test__");
  expect(testVal).toBe("ok");
  done();
});

afterAll(() => {
  redis.quit();
});
