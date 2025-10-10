'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from 'wagmi';
import { metaMask, walletConnect, coinbaseWallet, injected } from 'wagmi/connectors';
import { arbitrumSepolia } from 'viem/chains';
import { http } from 'viem';

// Crea i connectors in base alla disponibilità del Project ID
const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const hasValidWCProjectId = wcProjectId && wcProjectId !== 'YOUR_PROJECT_ID_HERE' && wcProjectId.length > 20;

const connectors = [
  injected({ shimDisconnect: true }),
  metaMask(),
  coinbaseWallet({
    appName: 'NFT Urbe Roma',
    appLogoUrl: typeof window !== 'undefined' ? `${window.location.origin}/metamask.png` : 'https://nfturbe.app/metamask.png'
  }),
  // Aggiungi WalletConnect condizionalmente
  ...(hasValidWCProjectId ? [
    walletConnect({ 
      projectId: wcProjectId,
      metadata: {
        name: 'NFT Urbe Roma',
        description: 'Minta il tuo personaggio romano NFT',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://nfturbe.app',
        icons: [typeof window !== 'undefined' ? `${window.location.origin}/metamask.png` : 'https://nfturbe.app/metamask.png']
      },
      showQrModal: true
    })
  ] : [])
];

const config = createConfig({
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http('https://sepolia-rollup.arbitrum.io/rpc')
  },
  connectors,
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


