import React from 'react';
import type { Metadata } from 'next';
import Providers from '../components/Providers';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Personaggio Romano',
  description: 'Crea il tuo personaggio romano e mintalo come NFT'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        {/* Background Colosseo + vignette */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: -1,
          backgroundImage: "url('/sfondo.png')",
          backgroundSize: 'cover', backgroundPosition: 'center'
        }} />
        <div className="vignette" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

