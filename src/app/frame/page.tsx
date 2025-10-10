import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nfturbe.app';

export const metadata: Metadata = {
  title: 'NFT Urbe Roma - Frame',
  description: 'Scopri che tipo di romano sei tramite Farcaster Frame',
  openGraph: {
    title: 'NFT Urbe Roma',
    description: 'Scopri che tipo di romano sei e minta il tuo NFT',
    images: [`${baseUrl}/sfondo.png`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/frame/image?step=hero`,
    'fc:frame:button:1': '🚀 Inizia il quiz',
    'fc:frame:post_url': `${baseUrl}/api/frame`,
  },
};

export default function FramePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-6 bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">
        <h1 className="text-4xl font-bold text-white mb-4">
          🏛️ NFT Urbe Roma
        </h1>
        <p className="text-xl text-white/90 mb-6">
          Questa pagina è ottimizzata per essere condivisa su Farcaster come Frame interattivo!
        </p>
        <div className="space-y-4 text-white/80 text-left">
          <h2 className="text-2xl font-semibold text-white">Come funziona:</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Condividi questo link su Farcaster</li>
            <li>Gli utenti vedranno un Frame interattivo</li>
            <li>Potranno scoprire il loro archetipo romano</li>
            <li>E mintare il loro NFT personalizzato!</li>
          </ol>
        </div>
        <div className="pt-6 border-t border-white/20">
          <a 
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold transition-all transform hover:scale-105"
          >
            🎨 Vai all'app completa
          </a>
        </div>
      </div>
    </main>
  );
}

