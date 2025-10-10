"use client";
import * as React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletButton() {
	const { isConnected, address } = useAccount();
	const { connect, connectors, isPending } = useConnect();
	const { disconnect } = useDisconnect();
	const [showModal, setShowModal] = React.useState(false);
	
	if (isConnected) {
		return (
			<button onClick={() => disconnect()} className="h-10 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 inline-flex items-center gap-2">
				<img src="/metamask.png" alt="Wallet" className="h-5 w-5" />
				<span className="text-sm">{address?.slice(0,6)}…{address?.slice(-4)}</span>
			</button>
		);
	}
	
	return (
		<>
			<button 
				onClick={() => setShowModal(true)} 
				className="h-10 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"
			>
				<img src="/metamask.png" alt="Wallet" className="h-5 w-5" />
				<span className="text-sm">{isPending ? 'Connessione…' : 'Connetti Wallet'}</span>
			</button>
			
			{showModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
					<div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border border-white/20" onClick={e => e.stopPropagation()}>
						<h3 className="text-xl font-bold mb-4 text-white">Connetti Wallet</h3>
						<div className="space-y-2">
							{connectors.map((connector) => (
								<button
									key={connector.id}
									onClick={() => {
										connect({ connector });
										setShowModal(false);
									}}
									disabled={isPending}
									className="w-full h-12 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 inline-flex items-center gap-3 text-white transition-colors"
								>
									<img src="/metamask.png" alt={connector.name} className="h-6 w-6" />
									<span>{connector.name}</span>
								</button>
							))}
						</div>
						<button 
							onClick={() => setShowModal(false)} 
							className="mt-4 w-full h-10 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm"
						>
							Annulla
						</button>
					</div>
				</div>
			)}
		</>
	);
}


