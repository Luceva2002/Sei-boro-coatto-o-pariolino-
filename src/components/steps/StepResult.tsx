"use client";
import * as React from 'react';
import type { Persona, Risposte } from '../../lib/persona';

export function StepResult({ persona, scores, risposte }: { persona: Persona; scores: { boro: number; pariolino: number; coatto: number }; risposte: Risposte }) {
	return (
		<div className="space-y-2">
			<br />
			<div className="text-lg">Risultato: <b className="capitalize">{persona}</b></div>
			<div className="text-white/80 text-sm">Punteggi — boro: {scores.boro} · pariolino: {scores.pariolino} · coatto: {scores.coatto}</div>
			<div className="text-white/70 text-sm">{risposte.nome} · {risposte.zona} · {risposte.abitazione} · {risposte.capelli} · {risposte.piatto}</div>
		</div>
	);
}


