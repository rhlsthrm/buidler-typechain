// We load the plugin here.
// We recommend using loadPluginFile in tests, as using usePlugin from within
// a plugin can interfer with any build step you have (e.g. TypeScript).
const { loadPluginFile } = require("hardhat/plugins-testing");
loadPluginFile(__dirname + "/../../src/index");

module.exports = {
  solc: {
    version: "0.6.8",
  },
  paths: {
    artifacts: "artifacts-dir",
  },
  typechain: {
    outDir: "../../testdir",
    target: "ethers-v5",
  },
};
