import "hardhat/types/config";

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    typechain?: {
      outDir?: string;
      target?: string;
      onCompile?: boolean;
      onTest?: boolean;
    };
  }

  export interface HardhatConfig {
    typechain: {
      outDir: string;
      target: string;
      onCompile: boolean;
      onTest: boolean;
    };
  }
}
