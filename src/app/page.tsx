'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useSendTransaction, useSwitchChain, useChainId } from 'wagmi';
import { generateTokenURI, derivePersona } from '../lib/nft';
import type { Zone, Hair, Persona } from '../lib/nft';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { parseEther } from 'viem';
import { arbitrumSepolia } from 'viem/chains';

export default function HomePage() {
  const RECIPIENT_ADDRESS = '0x1C9E05B29134233e19fbd0FE27400F5FFFc3737e';
  const MINT_PAYMENT_ETH = '0.000003'; // ~1 cent (variabile in base al prezzo ETH)
  const [name, setName] = useState<string>('');
  const [zone, setZone] = useState<Zone>('nord');
  const [hair, setHair] = useState<Hair>('ciuffo');
  const { isConnected } = useAccount();
  const { connect, connectors, isPending: isConnectPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync, isPending } = useWriteContract();
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const currentChainId = useChainId();
  const persona: Persona = useMemo(() => derivePersona(zone), [zone]);
  const tokenURI = useMemo(() => generateTokenURI(name, zone, hair), [name, zone, hair]);

  async function onMint() {
    if (!isConnected) return;
    try {
      // assicura rete Arbitrum Sepolia
      if (currentChainId !== arbitrumSepolia.id) {
        await switchChainAsync({ chainId: arbitrumSepolia.id });
      }
      // invia ETH fisso (~1 cent) all'indirizzo richiesto prima del mint
      await sendTransactionAsync({
        to: RECIPIENT_ADDRESS,
        value: parseEther(MINT_PAYMENT_ETH)
      });
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mint',
        args: [persona, hair]
      });
      alert('✅ NFT mintato con successo!');
    } catch (err: any) {
      console.error('Errore mint:', err);
      alert(`❌ Errore: ${err?.shortMessage || err?.message || 'Transazione fallita'}`);
    }
  }

  // Glass style helper
  const glass: React.CSSProperties = {
    backdropFilter: 'blur(14px) saturate(140%)',
    WebkitBackdropFilter: 'blur(14px) saturate(140%)',
    background: 'rgba(255, 255, 255, 0.18)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  };
  const colorByPersona: Record<Persona, string> = {
    bori: '#b35c1e',
    pariolini: '#1e5ab3',
    coatti: '#b31e1e'
  };

  return (
    <main style={{ maxWidth: 1040, margin: '40px auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...glass, padding: 16 }}>
        <h1 style={{ margin: 0, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>Personaggio Romano</h1>
        <div style={{ transform: 'translateZ(0)' }}>
          {isConnected ? (
            <button onClick={() => disconnect()} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid #fff', background: 'rgba(0,0,0,0.2)', color: '#fff' }}>Disconnetti</button>
          ) : (
            <button onClick={() => connect({ connector: connectors.find(c => c.id === 'io.metamask') || connectors[0] })} disabled={isConnectPending} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid #fff', background: 'rgba(0,0,0,0.2)', color: '#fff' }}>
              {isConnectPending ? 'Connessione…' : 'Connetti MetaMask'}
            </button>
          )}
        </div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div style={{ padding: 16, ...glass }}>
          <h3>1. Inserisci il nome</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #aaa' }}
          />

          <h3 style={{ marginTop: 24 }}>2. Seleziona la zona di Roma</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {([
              { key: 'fuori_gra', label: 'Fuori GRA' },
              { key: 'nord', label: 'Nord' },
              { key: 'sud', label: 'Sud' }
            ] as Array<{ key: Zone; label: string }>).map((z) => (
              <button
                key={z.key}
                onClick={() => setZone(z.key)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: zone === z.key ? '2px solid #000' : '1px solid #aaa',
                  background: zone === z.key ? '#e1f0ff' : '#fff'
                }}
              >
                {z.label}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: 24 }}>3. Scegli il taglio</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['ciuffo', 'doppiotaglio'] as Hair[]).map((h) => (
              <button
                key={h}
                onClick={() => setHair(h)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: hair === h ? '2px solid #000' : '1px solid #aaa',
                  background: hair === h ? '#ffe8c2' : '#fff'
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: 16, ...glass }}>
          <h3 style={{ marginTop: 0 }}>Anteprima NFT</h3>
          <div style={{ marginBottom: 8, fontSize: 13, color: '#222' }}>Personaggio: <span style={{ color: colorByPersona[persona], fontWeight: 700 }}>{persona}</span></div>
          <NFTPreview tokenURI={tokenURI} />
          <button
            onClick={onMint}
            disabled={!isConnected || isPending || isSending}
            style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, border: '1px solid #111', background: colorByPersona[persona], color: '#fff' }}
          >
            {isConnected ? ((isPending || isSending) ? 'Elaborazione…' : 'Mint NFT') : 'Connettiti per mintare'}
          </button>
        </div>
      </section>
    </main>
  );
}

function NFTPreview({ tokenURI }: { tokenURI: string }) {
  const [data, setData] = useState<{
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string }>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    try {
      const base64 = tokenURI.split(',')[1] ?? '';
      if (!base64) {
        if (!cancelled) setData(null);
        return;
      }
      const jsonStr = atob(base64);
      const parsed = JSON.parse(jsonStr) as {
        name: string;
        description: string;
        image: string;
        attributes: Array<{ trait_type: string; value: string }>;
      };
      if (!cancelled) setData(parsed);
    } catch {
      if (!cancelled) setData(null);
    }
    return () => {
      cancelled = true;
    };
  }, [tokenURI]);

  if (!data) {
    return <div>Anteprima non disponibile</div>;
  }

  return (
    <div>
      <img src={data.image} alt={data.name} style={{ width: '100%', borderRadius: 12, border: '1px solid #ddd' }} />
      <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>{data.description}</div>
    </div>
  );
}

