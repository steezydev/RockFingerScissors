import { utils } from "ethers";
import CollectionConfig from "./ContractConfig";

// Update the following array if you change the constructor arguments...
const ContractArguments = [
  CollectionConfig.subscriptionId,
  CollectionConfig.keyHash,
  CollectionConfig.coordinator,
  CollectionConfig.callbackGasLimit,
  CollectionConfig.requestConfirmations,
] as const;

export default ContractArguments;
