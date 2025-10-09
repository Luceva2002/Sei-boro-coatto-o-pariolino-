import React from 'react';
import type { Metadata } from 'next';
import Providers from '../components/Providers';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'Pasta Maker',
  description: 'Crea pasta e mintala come NFT'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

