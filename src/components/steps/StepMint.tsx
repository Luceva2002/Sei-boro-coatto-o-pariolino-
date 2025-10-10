"use client";
import * as React from 'react';
import { MintButton } from '../mint-button';
import type { Risposte } from '../../lib/persona';

function paletteFor(persona: string) {
	if (persona.includes('boro')) return { bgTop: '#ffe7cc', bgBottom: '#ffd1a1', face: '#f3e1cf', accent: '#b35c1e' };
	if (persona.includes('pariolino')) return { bgTop: '#d7e6ff', bgBottom: '#b7d3ff', face: '#efe7de', accent: '#1e5ab3' };
	return { bgTop: '#ffd6d6', bgBottom: '#ffb3b3', face: '#f2e6dc', accent: '#b31e1e' };
}

function hairShape(capelli?: string, color?: string) {
	const c = color || '#333';
	if (capelli === 'sfumato' || capelli === 'pulito') {
		return `<rect x='380' y='320' width='280' height='80' rx='16' fill='${c}'/>`;
	}
	if (capelli === 'ricci') {
		return `<path d='M360 340 C 400 300, 440 360, 480 320 C 520 280, 560 360, 600 320 C 640 280, 680 340, 700 340' stroke='${c}' stroke-width='18' fill='none'/>`;
	}
	if (capelli === 'cresta') {
		return `<path d='M480 300 L512 240 L544 300 Z' fill='${c}'/>`;
	}
	return `<rect x='380' y='320' width='280' height='60' rx='12' fill='${c}'/>`;
}

function renderSVG(risposte: Risposte, persona: string) {
	const pal = paletteFor(persona);
	const name = risposte.nome || 'Anonimo';
	const subtitle = `${persona} · ${risposte.zona || '—'} · ${risposte.capelli || '—'}`;
	return (
		`<svg xmlns='http://www.w3.org/2000/svg' width='1024' height='1024' viewBox='0 0 1024 1024'>` +
		`<defs>` +
		`<linearGradient id='bg' x1='0' x2='0' y1='0' y2='1'><stop offset='0%' stop-color='${pal.bgTop}'/><stop offset='100%' stop-color='${pal.bgBottom}'/></linearGradient>` +
		`</defs>` +
		`<rect width='100%' height='100%' fill='url(#bg)'/>` +
		`<g>` +
		`<circle cx='512' cy='520' r='260' fill='${pal.face}' stroke='#222' stroke-width='6'/>` +
		hairShape(risposte.capelli, pal.accent) +
		`<circle cx='440' cy='520' r='18' fill='#222'/>` +
		`<circle cx='584' cy='520' r='18' fill='#222'/>` +
		`<path d='M430 600 Q 512 640 594 600' stroke='#222' stroke-width='10' fill='none' stroke-linecap='round'/>` +
		`</g>` +
		`<text x='50%' y='180' text-anchor='middle' font-size='48' font-family='monospace' fill='#111'>${name}</text>` +
		`<text x='50%' y='230' text-anchor='middle' font-size='26' font-family='monospace' fill='#333'>${subtitle}</text>` +
		`</svg>`
	);
}

export function StepMint({ risposte, persona }: { risposte: Risposte; persona: string }) {
	const svg = React.useMemo(() => renderSVG(risposte, persona), [risposte, persona]);
	const dataUrl = React.useMemo(() => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,[svg]);
	return (
		<div className="space-y-4 text-center">
			<img src={dataUrl} alt="Anteprima NFT" className="mx-auto max-w-md w-full rounded-2xl border border-white/20" />
			<MintButton risposte={risposte} persona={persona} />
		</div>
	);
}


