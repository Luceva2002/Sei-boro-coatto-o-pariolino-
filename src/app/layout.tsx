import React from 'react';
import type { Metadata } from 'next';
import Providers from '../components/Providers';
import '../styles/globals.css';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nfturbe.app';

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
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: `${baseUrl}/api/frame/image?step=hero`,
      button: {
        title: 'Launch NFT Urbe',
        action: {
          type: 'launch_miniapp',
          name: 'NFT Urbe Roma',
          url: baseUrl,
          splashImageUrl: `${baseUrl}/sfondo1.png`,
          splashBackgroundColor: '#000000'
        }
      }
    })
  },
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

