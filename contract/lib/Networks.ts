import NetworkConfigInterface from "./NetworkConfigInterface";

/*
 * Local networks
 */
export const hardhatLocal: NetworkConfigInterface = {
  chainId: 31337,
  symbol: "ETH (test)",
  blockExplorer: {
    name: "Block explorer (not available for local chains)",
    generateContractUrl: (contractAddress: string) => `#`,
  },
};

/*
 * Ethereum
 */
export const ethereumTestnet: NetworkConfigInterface = {
  chainId: 5,
  symbol: "ETH (test)",
  blockExplorer: {
    name: "Etherscan (Goerli)",
    generateContractUrl: (contractAddress: string) =>
      `https://goerli.etherscan.io/address/${contractAddress}`,
  },
};

export const ethereumMainnet: NetworkConfigInterface = {
  chainId: 1,
  symbol: "ETH",
  blockExplorer: {
    name: "Etherscan",
    generateContractUrl: (contractAddress: string) =>
      `https://etherscan.io/address/${contractAddress}`,
  },
};

/*
 * BSC
 */
export const bscTestnet: NetworkConfigInterface = {
  chainId: 97,
  symbol: "BSC (test)",
  blockExplorer: {
    name: "Bscscan (test)",
    generateContractUrl: (contractAddress: string) =>
      `https://testnet.bscscan.com/address/${contractAddress}`,
  },
};

export const bscMainnet: NetworkConfigInterface = {
  chainId: 56,
  symbol: "BSC",
  blockExplorer: {
    name: "Bscscan",
    generateContractUrl: (contractAddress: string) =>
      `https://bscscan.com/address/${contractAddress}`,
  },
};
