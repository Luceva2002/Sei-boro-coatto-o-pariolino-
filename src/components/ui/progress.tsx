import * as React from 'react';

export function Progress({ value, max=100 }: { value: number; max?: number }) {
	const pct = Math.max(0, Math.min(100, (value / max) * 100));
	return (
		<div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
			<div className="h-full bg-[var(--accent)] transition-all" style={{ width: pct + '%' }} />
		</div>
	);
}


