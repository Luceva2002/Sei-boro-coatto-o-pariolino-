import React from 'react';
import type { Metadata } from 'next';
import Providers from '../components/Providers';
import { DevWarnings } from '../components/DevWarnings';
import '../styles/globals.css';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://boro-coatto-pariolino.vercel.app';

export const metadata: Metadata = {
  title: 'NFT Urbe Roma - Personaggio Romano',
  description: 'Scopri che tipo di romano sei e minta il tuo NFT personalizzato. Boro, Pariolino o Coatto?',
  openGraph: {
    title: 'NFT Urbe Roma',
    description: 'Scopri che tipo di romano sei e minta il tuo NFT personalizzato',
    images: [`${baseUrl}/sfondo.png`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/frame/image?step=hero`,
    'fc:frame:button:1': '🚀 Scopri il tuo archetipo',
    'fc:frame:post_url': `${baseUrl}/api/frame`,
    'og:image': `${baseUrl}/sfondo.png`,
  },
  manifest: `${baseUrl}/.well-known/farcaster.json`,
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
        <DevWarnings />
      </body>
    </html>
  );
}

