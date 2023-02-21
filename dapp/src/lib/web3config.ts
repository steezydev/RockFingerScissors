import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import ABI from '@/lib/abi/RFS';

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_URL ?? '',
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Rock Finger Scissors',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

interface Contract {
  address: `0x${string}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any;
}

const contract: Contract = {
  address:
    (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) ??
    '0xAc33cC83E3a0964CB1E057Aa96Ce9C76B6f21328',
  abi: ABI,
};

export { chains, connectors, contract, provider, wagmiClient };
