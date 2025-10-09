"use client";
import * as React from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ className, variant = 'default', size = 'md', ...props }, ref
){
	const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/40 disabled:opacity-50 disabled:pointer-events-none';
	const variants = {
		default: 'bg-[var(--accent)] text-white hover:brightness-110',
		outline: 'border border-white/20 text-[var(--fg)] hover:bg-white/10',
		ghost: 'text-[var(--fg)] hover:bg-white/10'
	};
	const sizes = { sm: 'h-9 px-3', md: 'h-11 px-4', lg: 'h-12 px-5 text-lg' } as const;
	return (
		<button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
	);
});


