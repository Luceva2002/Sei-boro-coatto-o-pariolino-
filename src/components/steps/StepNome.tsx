"use client";
import * as React from 'react';
import { Input } from '../ui/input';

export function StepNome({ nome, setNome }: { nome: string; setNome: (v: string) => void }) {
	return (
		<div className="space-y-3">
			<br />
			<br />
			<br />
			<Input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Inserisci il nome" />
		</div>
	);
}


