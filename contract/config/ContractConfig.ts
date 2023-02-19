import CollectionConfigInterface from "../lib/ContractConfigInterface";
import * as Networks from "../lib/Networks";

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.bscTestnet,
  mainnet: Networks.bscMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "RFS",
  contractAddress: "0xfcB9fB578D44D8f4db6AE8Ab4c690E95304EFA6E",

  subscriptionId: 2558,
  keyHash: "0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314",
  coordinator: "0x6A2AAd07396B36Fe02a22b33cf443582f682c82f",
  callbackGasLimit: 40000,
  requestConfirmations: 3,
};

export default CollectionConfig;
