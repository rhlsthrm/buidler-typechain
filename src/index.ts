import fsExtra from "fs-extra";
import { TASK_CLEAN, TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import { task } from "hardhat/config";
import { HardhatPluginError } from "hardhat/plugins";
import { tsGenerator } from "ts-generator";
import { TypeChain } from "typechain/dist/TypeChain";

import { getDefaultTypechainConfig } from "./config";

task(
  "typechain",
  "Generate Typechain typings for compiled contracts"
).setAction(async ({}, { config, run, artifacts }) => {
  const typechain = getDefaultTypechainConfig(config);
  const typechainTargets = ["ethers-v5", "web3-v1", "truffle-v5"];
  if (!typechainTargets.includes(typechain.target as string)) {
    throw new HardhatPluginError(
      "Typechain",
      "Invalid Typechain target, please provide via hardhat.config.js (typechain.target)"
    );
  }

  await run(TASK_COMPILE);

  console.log(
    `Creating Typechain artifacts in directory ${typechain.outDir} for target ${typechain.target}`
  );

  const cwd = process.cwd();
  await tsGenerator(
    { cwd },
    new TypeChain({
      cwd,
      rawConfig: {
        files: `${config.paths.artifacts}/!(build-info)/*/!(*.dbg).json`,
        outDir: typechain.outDir,
        target: typechain.target as string,
      },
    })
  );

  console.log(`Successfully generated Typechain artifacts!`);
});

task(
  TASK_CLEAN,
  "Clears the cache and deletes all artifacts",
  async (_, { config }) => {
    await fsExtra.remove(config.paths.cache);
    await fsExtra.remove(config.paths.artifacts);
    if (config.typechain && config.typechain.outDir) {
      await fsExtra.remove(config.typechain.outDir);
    }
  }
);
