// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Happy case", function () {
    this.timeout(120_000);
    useEnvironment("hardhat-project");

    beforeEach(async function () {
      await this.hre.run("clean");
    });

    it("Compiles and generates Typechain artifacts", async function () {
      try {
        await this.hre.run("typechain");
        assert.isTrue(true);
      } catch (error) {
        assert.fail(error.message);
      }
    });
  });
});
