import NetworkConfigInterface from "./NetworkConfigInterface";

interface SaleConfig {
  price: number;
  maxMintAmountPerTx: number;
  maxPerWallet: number;
}

export default interface CollectionConfigInterface {
  testnet: NetworkConfigInterface;
  mainnet: NetworkConfigInterface;
  contractName: string;
  contractAddress: string | null;
  subscriptionId: number;
  keyHash: string;
  coordinator: string;
  callbackGasLimit: number;
  requestConfirmations: number;
}
