"use client";
import * as React from 'react';

type Item = { label: string; value: string };

export function RadioGroup({ items, value, onChange }: { items: Item[]; value?: string; onChange?: (v: string) => void }) {
	return (
		<div className="flex flex-wrap gap-2">
			{items.map(it => (
				<button
					key={it.value}
					onClick={() => onChange?.(it.value)}
					className={`h-10 px-3 rounded-xl border ${value===it.value? 'bg-[var(--accent)] text-white border-transparent' : 'bg-white/10 text-[var(--fg)] border-white/20 hover:bg-white/15'}`}
				>
					{it.label}
				</button>
			))}
		</div>
	);
}


