import { ethers } from "hardhat";
import ContractConfig from "./../config/ContractConfig";
import ContractArguments from "./../config/ContractArguments";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  console.log("Deploying contract...");

  // We get the contract to deploy
  const Contract = await ethers.getContractFactory(ContractConfig.contractName);
  const contract = await Contract.deploy(...ContractArguments);

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
