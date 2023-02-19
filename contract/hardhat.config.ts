import fs from "fs";
import { HardhatUserConfig, task } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import ContractConfig from "./config/ContractConfig";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-abi-exporter";

dotenv.config();

task(
  "rename-contract",
  "Renames the smart contract replacing all occurrences in source files",
  async (taskArgs: { newName: string }, hre) => {
    // Validate new name
    if (!/^([A-Z][A-Za-z0-9]+)$/.test(taskArgs.newName)) {
      throw "The contract name must be in PascalCase: https://en.wikipedia.org/wiki/Camel_case#Variations_and_synonyms";
    }

    const oldContractFile = `${__dirname}/contracts/${ContractConfig.contractName}.sol`;
    const newContractFile = `${__dirname}/contracts/${taskArgs.newName}.sol`;

    if (!fs.existsSync(oldContractFile)) {
      throw `Contract file not found: "${oldContractFile}" (did you change the configuration manually?)`;
    }

    if (fs.existsSync(newContractFile)) {
      throw `A file with that name already exists: "${oldContractFile}"`;
    }

    // Replace names in source files
    replaceInFile(
      __dirname + "/config/ContractConfig.ts",
      ContractConfig.contractName,
      taskArgs.newName
    );
    replaceInFile(
      __dirname + "/lib/ContractProvider.ts",
      ContractConfig.contractName,
      taskArgs.newName
    );
    replaceInFile(
      oldContractFile,
      ContractConfig.contractName,
      taskArgs.newName
    );

    // Rename the contract file
    fs.renameSync(oldContractFile, newContractFile);

    console.log(
      `Contract renamed successfully from "${ContractConfig.contractName}" to "${taskArgs.newName}"!`
    );

    // Rebuilding types
    await hre.run("typechain");
  }
).addPositionalParam("newName", "The new name");

const DEFAULT_GAS_MULTIPLIER: number = 1;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  abiExporter: {
    path: "./abi/",
    runOnCompile: false,
    only: [":" + ContractConfig.contractName + "$"],
  },
  networks: {
    truffle: {
      url: "http://localhost:24012/rpc",
      timeout: 60000,
      gasMultiplier: DEFAULT_GAS_MULTIPLIER,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.GAS_REPORTER_COIN_MARKET_CAP_API_KEY,
  },
  etherscan: {
    apiKey: {
      // Ethereum
      goerli: process.env.BLOCK_EXPLORER_API_KEY!,
      mainnet: process.env.BLOCK_EXPLORER_API_KEY!,

      // BSC
      bsc: process.env.BLOCK_EXPLORER_BSC_API_KEY!,
      bscTestnet: process.env.BLOCK_EXPLORER_BSC_API_KEY!,

      // Polygon
      polygon: process.env.BLOCK_EXPLORER_API_KEY!,
      polygonMumbai: process.env.BLOCK_EXPLORER_API_KEY!,
    },
  },
};

// Setup "testnet" network
if (process.env.NETWORK_TESTNET_URL !== undefined) {
  config.networks!.testnet = {
    url: process.env.NETWORK_TESTNET_URL,
    accounts: [process.env.NETWORK_TESTNET_PRIVATE_KEY!],
    gasMultiplier: DEFAULT_GAS_MULTIPLIER,
  };
}

// Setup "mainnet" network
if (process.env.NETWORK_MAINNET_URL !== undefined) {
  config.networks!.mainnet = {
    url: process.env.NETWORK_MAINNET_URL,
    accounts: [process.env.NETWORK_MAINNET_PRIVATE_KEY!],
    gasMultiplier: DEFAULT_GAS_MULTIPLIER,
  };
}

export default config;

/**
 * Replaces all occurrences of a string in the given file.
 */
function replaceInFile(file: string, search: string, replace: string): void {
  const fileContent = fs
    .readFileSync(file, "utf8")
    .replace(new RegExp(search, "g"), replace);

  fs.writeFileSync(file, fileContent, "utf8");
}
