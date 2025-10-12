"use client";
import * as React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getQuestion, getOptions } from '../../lib/persona';

export function StepQuestion({ id, value, onChange }: { id: string; value?: string; onChange: (v: string) => void }) {
	const q = getQuestion(id);
	if (!q) return null;
	return (
		<div className="space-y-4">
			{q.type === 'text' ? (
				<div className="space-y-3 flex justify-center">
					<Input value={value || ''} onChange={e=>onChange(e.target.value)} placeholder={q.label} className="max-w-md" />
				</div>
			) : (
				<div className="grid grid-cols-2 gap-4 justify-items-center">
					{getOptions(id).map(o => (
						<Button key={o.value} variant={value===o.value? 'default':'outline'} onClick={()=>onChange(o.value)} className="w-full">
							{o.label}
						</Button>
					))}
				</div>
			)}
		</div>
	);
}


