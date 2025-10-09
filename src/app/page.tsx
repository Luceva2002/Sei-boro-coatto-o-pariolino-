'use client';

import React, { useMemo, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { generateTokenURI } from '../lib/nft';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';

type Pasta = 'rigatoni' | 'spaghetti' | 'fusilli';
type Sugo = 'carbonara' | 'gricia' | 'cacio e pepe' | 'amatriciana';

export default function HomePage() {
  const [pasta, setPasta] = useState<Pasta>('rigatoni');
  const [sugo, setSugo] = useState<Sugo>('carbonara');
  const { isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const tokenURI = useMemo(() => generateTokenURI(pasta, sugo), [pasta, sugo]);

  async function onMint() {
    if (!isConnected) return;
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [pasta, sugo]
    });
  }

  return (
    <main style={{ maxWidth: 960, margin: '24px auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Pasta Maker</h1>
        <ConnectButton />
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div>
          <h3>1. Scegli la pasta</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['rigatoni', 'spaghetti', 'fusilli'] as Pasta[]).map((p) => (
              <button
                key={p}
                onClick={() => setPasta(p)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: pasta === p ? '2px solid #000' : '1px solid #aaa',
                  background: pasta === p ? '#ffe8c2' : '#fff'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: 24 }}>2. Scegli il sugo</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['carbonara', 'gricia', 'cacio e pepe', 'amatriciana'] as Sugo[]).map((s) => (
              <button
                key={s}
                onClick={() => setSugo(s)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: sugo === s ? '2px solid #000' : '1px solid #aaa',
                  background: sugo === s ? '#ffe8c2' : '#fff'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3>Anteprima NFT</h3>
          <NFTPreview tokenURI={tokenURI} />
          <button
            onClick={onMint}
            disabled={!isConnected || isPending}
            style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, border: '1px solid #111' }}
          >
            {isConnected ? (isPending ? 'Minting…' : 'Mint NFT') : 'Connettiti per mintare'}
          </button>
        </div>
      </section>
    </main>
  );
}

function NFTPreview({ tokenURI }: { tokenURI: string }) {
  try {
    const base64 = tokenURI.split(',')[1] ?? '';
    const jsonStr = typeof window === 'undefined' ? '' : atob(base64);
    const json = JSON.parse(jsonStr) as {
      name: string;
      description: string;
      image: string;
      attributes: Array<{ trait_type: string; value: string }>;
    };
    return (
      <div>
        <img src={json.image} alt={json.name} style={{ width: '100%', borderRadius: 12, border: '1px solid #ddd' }} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>{json.description}</div>
      </div>
    );
  } catch {
    return <div>Anteprima non disponibile</div>;
  }
}

