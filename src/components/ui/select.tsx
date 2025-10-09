"use client";
import * as React from 'react';
import { cn } from '../../lib/utils';

type Option = { label: string; value: string };
type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { options: Option[] };

export function Select({ className, options, ...props }: Props) {
	return (
		<select className={cn('h-11 w-full rounded-xl bg-white/10 border border-white/20 px-3 text-[var(--fg)] outline-none focus:ring-2 focus:ring-white/30', className)} {...props}>
			{options.map(o => (
				<option key={o.value} value={o.value} className="bg-[var(--bg)] text-[var(--fg)]">{o.label}</option>
			))}
		</select>
	);
}


