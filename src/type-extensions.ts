import "hardhat/types/config";

import { TypechainConfig, TypechainUserConfig } from "./types";

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    typechain?: TypechainUserConfig;
  }

  export interface HardhatConfig {
    typechain: TypechainConfig;
  }
}
