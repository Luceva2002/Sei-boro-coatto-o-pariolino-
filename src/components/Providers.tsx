'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from 'wagmi';
import { metaMask, walletConnect, coinbaseWallet, injected } from 'wagmi/connectors';
import { arbitrumSepolia } from 'viem/chains';
import { http } from 'viem';

const config = createConfig({
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http('https://sepolia-rollup.arbitrum.io/rpc')
  },
  connectors: [
    injected({ shimDisconnect: true }),
    metaMask(),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '9b8e5c87f5f8c9e8d3a7b6c5d4e3f2a1',
      metadata: {
        name: 'NFT Urbe Roma',
        description: 'Minta il tuo personaggio romano NFT',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://nfturbe.app',
        icons: ['https://nfturbe.app/metamask.png']
      }
    }),
    coinbaseWallet({
      appName: 'NFT Urbe Roma',
      appLogoUrl: 'https://nfturbe.app/metamask.png'
    })
  ],
  ssr: true
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}


