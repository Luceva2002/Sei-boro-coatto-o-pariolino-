"use client";
import * as React from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { WalletButton } from './wallet-button';

export function StepShell({
	title,
	description,
	step,
	total,
	onBack,
	onNext,
	children
}: {
	title: string;
	description?: string;
	step: number;
	total: number;
	onBack?: () => void;
	onNext?: () => void;
	children: React.ReactNode;
}) {
	const pct = Math.round(((step+1)/total)*100);
	return (
		<div className="relative mx-auto max-w-3xl p-4 sm:p-6 pb-28">
			{/* Wallet in alto a sinistra */}
			<div className="fixed top-4 left-4 z-20">
				<WalletButton />
			</div>

			{/* Contenuto senza glass */}
			<h2 className="text-2xl font-semibold mb-3 text-center">{title}</h2>
			{description ? <p className="text-white/80 mb-6 text-center">{description}</p> : null}
			<div className="min-h-[280px]">{children}</div>

			{/* Bottoni fissi in basso */}
			{onBack ? (
				<div className="fixed left-4 bottom-16 z-20">
					<Button variant="outline" onClick={onBack}>Indietro</Button>
				</div>
			) : null}
			{onNext ? (
				<div className="fixed right-4 bottom-16 z-20">
					<Button onClick={onNext}>Avanti</Button>
				</div>
			) : null}

			{/* Barra di progresso in fondo */}
			<div className="fixed left-0 right-0 bottom-0 z-10 p-3">
				<Progress value={pct} />
			</div>
		</div>
	);
}


