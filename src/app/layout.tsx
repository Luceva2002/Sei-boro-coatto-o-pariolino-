import React from 'react';
import type { Metadata } from 'next';
import Providers from '../components/Providers';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'Personaggio Romano',
  description: 'Crea il tuo personaggio romano e mintalo come NFT'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{
        minHeight: '100vh',
        margin: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1526481280698-8fcc13fd494a?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

