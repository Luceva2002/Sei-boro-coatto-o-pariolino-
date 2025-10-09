"use client";
import * as React from 'react';
import { Button } from '../ui/button';

export function StepHero({ onStart }: { onStart: () => void }) {
	return (
		<div className="text-center space-y-6">
			<br />
			<h1 className="text-4xl font-semibold">Vedemo se sei boro<br /> coatto o pariolino</h1>
			<br />
			<br />
			<Button onClick={onStart} size="lg">Inizia</Button>
		</div>
	);
}


