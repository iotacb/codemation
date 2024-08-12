import React from 'react';
import { cn } from '../utils/utils';

export default function Button({
	children,
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={cn(
				'rounded-lg bg-neutral-900 px-6 py-3 duration-150 hover:bg-neutral-800',
				className,
				'disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-400'
			)}
			{...props}
		>
			{children}
		</button>
	);
}
