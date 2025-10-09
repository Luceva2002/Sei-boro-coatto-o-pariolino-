"use client";
import * as React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getQuestion, getOptions } from '../../lib/persona';

export function StepQuestion({ id, value, onChange }: { id: string; value?: string; onChange: (v: string) => void }) {
	const q = getQuestion(id);
	if (!q) return null;
	return (
		<div className="space-y-3">
			{q.type === 'text' ? (
				<div className="space-y-3">
					<Input value={value || ''} onChange={e=>onChange(e.target.value)} placeholder={q.label} />
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
					{getOptions(id).map(o => (
						<Button key={o.value} variant={value===o.value? 'default':'outline'} onClick={()=>onChange(o.value)}>
							{o.label}
						</Button>
					))}
				</div>
			)}
		</div>
	);
}


