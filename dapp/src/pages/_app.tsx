import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';
import '@/styles/globals.css';

import { chains, wagmiClient } from '@/lib/web3config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />{' '}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
