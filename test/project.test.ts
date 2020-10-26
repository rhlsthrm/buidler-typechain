// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import fs from "fs";

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
        const exists = fs.existsSync(this.hre.config.typechain.outDir);
        assert.isFalse(exists);

        await this.hre.run("compile");

        const dir = await fs.promises.readdir(this.hre.config.typechain.outDir);
        assert.notEqual(dir.length, 0);
      } catch (error) {
        assert.fail(error.message);
      }
    });
  });
});
