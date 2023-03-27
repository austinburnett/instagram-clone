const mongoUtil = require("../util/mongoUtil.js");

test("connects to MongoDB and returns Promise", async () => {
    await expect(mongoUtil.connect().resolves.toBe(typeof Promise))
});
