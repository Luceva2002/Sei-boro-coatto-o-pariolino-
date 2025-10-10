"use client";
import * as React from 'react';
import { Button } from './ui/button';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import type { Risposte } from '../lib/persona';

type MintButtonProps = {
	risposte: Risposte;
	persona: string;
};

export function MintButton({ risposte, persona }: MintButtonProps) {
	const { isConnected, address } = useAccount();
	const { writeContract, data: hash, isPending, isError, error } = useWriteContract();
	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
	const [localSuccess, setLocalSuccess] = React.useState(false);
	
	React.useEffect(() => {
		if (isSuccess && !localSuccess) {
			setLocalSuccess(true);
		}
	}, [isSuccess, localSuccess]);

	const handleMint = async () => {
		if (!isConnected) {
			alert('Connetti prima il wallet!');
			return;
		}
		
		try {
			// Mappo il piatto in pastaType e sauce
			const piatto = risposte.piatto || 'carbonara';
			let pastaType = 'spaghetti';
			let sauce = piatto;
			
			switch(piatto) {
				case 'carbonara':
					pastaType = 'rigatoni';
					sauce = 'carbonara';
					break;
				case 'cacio':
					pastaType = 'tonnarelli';
					sauce = 'cacio e pepe';
					break;
				case 'sushi':
					pastaType = 'riso';
					sauce = 'soia';
					break;
				case 'kebab':
					pastaType = 'pita';
					sauce = 'piccante';
					break;
			}
			
			writeContract({
				address: CONTRACT_ADDRESS,
				abi: CONTRACT_ABI,
				functionName: 'mint',
				args: [pastaType, sauce]
			});
		} catch (err) {
			console.error('Errore mint:', err);
		}
	};

	if (localSuccess) {
		return (
			<div className="space-y-3 text-center">
				<div className="text-green-400 font-bold text-lg">✅ NFT Mintato con successo!</div>
				<div className="text-sm text-white/70">
					Transaction: {hash?.slice(0, 10)}...{hash?.slice(-8)}
				</div>
				<Button onClick={() => window.location.reload()} variant="outline">
					Minta un altro
				</Button>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="space-y-3 text-center">
				<div className="text-red-400 font-bold">❌ Errore nel mint</div>
				<div className="text-sm text-white/60">{error?.message || 'Errore sconosciuto'}</div>
				<Button onClick={handleMint}>Riprova</Button>
			</div>
		);
	}

	if (isConfirming) {
		return (
			<Button disabled className="cursor-wait">
				⏳ Conferma in corso...
			</Button>
		);
	}

	return (
		<Button 
			onClick={handleMint} 
			disabled={!isConnected || isPending}
			className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
		>
			{isPending ? '⏳ Firmando transazione...' : isConnected ? '🎨 Mint NFT' : '⚠️ Connetti Wallet'}
		</Button>
	);
}


