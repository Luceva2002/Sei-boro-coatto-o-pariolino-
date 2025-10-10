"use client";
import { useEffect, useState } from 'react';

export function DevWarnings() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Verifica se siamo in dev e se WalletConnect non è configurato
    const isDev = process.env.NODE_ENV === 'development';
    const wcId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
    const isWCConfigured = wcId && wcId !== 'YOUR_PROJECT_ID_HERE' && wcId.length > 20;

    if (isDev && !isWCConfigured) {
      setShowWarning(true);
    }

    // Sopprimi errori analytics di Coinbase in console (bloccati da AdBlock)
    if (isDev && typeof window !== 'undefined') {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const errorStr = args.join(' ');
        // Ignora errori comuni di analytics/tracking bloccati
        if (
          errorStr.includes('cca-lite.coinbase.com') ||
          errorStr.includes('Analytics SDK') ||
          errorStr.includes('ERR_BLOCKED_BY_CLIENT') ||
          errorStr.includes('castbuddy')
        ) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-yellow-500/90 text-black p-4 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-bold mb-1">WalletConnect non configurato</h3>
          <p className="text-sm">
            Per usare wallet mobili, ottieni un Project ID gratuito da{' '}
            <a 
              href="https://cloud.walletconnect.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-semibold hover:text-black/80"
            >
              cloud.walletconnect.com
            </a>
          </p>
          <button 
            onClick={() => setShowWarning(false)}
            className="mt-2 text-xs underline hover:no-underline"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}

