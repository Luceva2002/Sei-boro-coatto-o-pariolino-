"use client";
import * as React from 'react';
import { MintButton } from '../mint-button';
import type { Risposte } from '../../lib/persona';

// Mappa i personaggi alle immagini corrispondenti
function getImageForPersona(persona: string): string {
	if (persona.includes('boro')) return '/Boro.png';
	if (persona.includes('pariolino')) return '/Pariolino.png';
	if (persona.includes('coatto')) return '/Coatto.png';
	return '/Boro.png'; // default
}

export function StepMint({ risposte, persona }: { risposte: Risposte; persona: string }) {
	const imageUrl = React.useMemo(() => getImageForPersona(persona), [persona]);
	
	return (
		<div className="space-y-4 text-center">
			<img 
				src={imageUrl} 
				alt={`NFT ${persona}`} 
				className="mx-auto max-w-md w-full rounded-2xl border border-white/20" 
			/>
			<div className="text-lg font-semibold capitalize text-white">
				{risposte.nome || 'Anonimo'} - {persona}
			</div>
			<MintButton risposte={risposte} persona={persona} />
		</div>
	);
}


