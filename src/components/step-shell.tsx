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
	showWallet,
	children
}: {
	title: string;
	description?: string;
	step: number;
	total: number;
	onBack?: () => void;
	onNext?: () => void;
	showWallet?: boolean;
	children: React.ReactNode;
}) {
	const pct = Math.round(((step+1)/total)*100);
	return (
		<div className="relative mx-auto max-w-2xl px-4 sm:px-6 pb-32">
			{/* Contenuto centrato per mobile */}
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
				{description ? <p className="text-white/80 mb-6 text-center">{description}</p> : null}
				<div className="w-full max-w-xl">{children}</div>
			</div>

			{/* Bottoni centrati sotto il quiz + Wallet a destra */}
			{(onBack || onNext || showWallet) && (
				<div className="fixed left-0 right-0 bottom-16 z-20 flex justify-center items-center gap-4 px-4">
					<div className="flex gap-4 items-center">
						{onBack && (
							<Button variant="outline" onClick={onBack} className="min-w-[120px]">
								Indietro
							</Button>
						)}
						{onNext && (
							<Button onClick={onNext} className="min-w-[120px]">
								Avanti
							</Button>
						)}
						{showWallet && (
							<div className="ml-2">
								<WalletButton />
							</div>
						)}
					</div>
				</div>
			)}

			{/* Barra di progresso in fondo */}
			<div className="fixed left-0 right-0 bottom-0 z-10 p-3">
				<Progress value={pct} />
			</div>
		</div>
	);
}


