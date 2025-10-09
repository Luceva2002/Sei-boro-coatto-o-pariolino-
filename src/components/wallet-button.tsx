"use client";
import * as React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

export function WalletButton() {
	const { isConnected, address } = useAccount();
	const { connect, connectors, isPending } = useConnect();
	const { disconnect } = useDisconnect();
	const mm = connectors.find(c=>c.id==='io.metamask') || metaMask();
	return (
		<button onClick={() => isConnected ? disconnect() : connect({ connector: mm })} className="h-10 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 inline-flex items-center gap-2">
			<img src="/metamask.png" alt="MetaMask" className="h-5 w-5" />
			<span className="text-sm">{isConnected ? (address?.slice(0,6)+'…'+address?.slice(-4)) : (isPending ? 'Connessione…' : 'Connetti')}</span>
		</button>
	);
}


