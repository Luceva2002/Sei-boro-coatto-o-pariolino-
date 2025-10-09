"use client";
import * as React from 'react';
import { Button } from './ui/button';

export function MintButton({ onMint }: { onMint?: () => Promise<void> | void }) {
	const [busy, setBusy] = React.useState(false);
	return (
		<Button onClick={async () => { try { setBusy(true); await onMint?.(); alert('Mint stub: pronto a connettere MetaMask.'); } finally { setBusy(false); } }} disabled={busy}>
			{busy ? 'Elaborazione…' : 'Mint NFT'}
		</Button>
	);
}


