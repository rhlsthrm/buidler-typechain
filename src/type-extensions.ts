import { TypechainConfig } from "./types";

declare module "hardhat/types" {
  interface HardhatUserConfig {
    typechain?: TypechainConfig;
  }

  interface HardhatConfig {
    typechain: TypechainConfig;
  }
}
