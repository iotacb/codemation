import React from 'react';
import { useEffect, useState } from 'react';
import { ShikiMagicMove } from 'shiki-magic-move/react';
import { type HighlighterCore, getHighlighter } from 'shiki';
import 'shiki-magic-move/dist/style.css';
import { Editor } from '@monaco-editor/react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { DisplayedSlideProps } from '../types/SlideTypes';
import { cn } from '../utils/utils';

export default function DisplayedSlide({
	index,
	previewing,
	content,
	changeSlide: changeSlide,
	onChange: onChange,
	...props
}: DisplayedSlideProps &
	Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>) {
	const [highlighter, setHighlighter] = useState<HighlighterCore>();

	useEffect(() => {
		async function initializeHighlighter() {
			const highlighter = await getHighlighter({
				themes: ['dracula'],
				langs: ['javascript', 'typescript'],
			});
			setHighlighter(highlighter);
		}
		initializeHighlighter();
	}, []);

	return (
		<div
			className={cn(
				'relative h-full w-full rounded-lg bg-neutral-900 p-5 duration-150',
				previewing && 'ring-1 ring-sky-500'
			)}
			{...props}
		>
			{!previewing && (
				<Editor
					theme="vs-dark"
					value={content ?? ''}
					onChange={(value) => onChange?.(value ?? '')}
					language="typescript"
					height="100%"
					width="100%"
					options={{
						minimap: {
							enabled: false,
						},
						renderValidationDecorations: 'off',
						overviewRulerBorder: false,
					}}
				/>
			)}
			{previewing && highlighter && (
				<div className="relative h-full w-full">
					<ShikiMagicMove
						lang="ts"
						theme="dracula"
						highlighter={highlighter}
						code={content ?? ''}
						options={{
							duration: 1000,
							stagger: 50,
							animateContainer: true,
							enhanceMatching: true,
							lineNumbers: true,
						}}
					/>
					<ArrowButtons
						changeSlide={changeSlide!}
						previewing={previewing}
					/>
				</div>
			)}
		</div>
	);
}

function ArrowButtons({
	previewing,
	changeSlide,
}: {
	previewing: boolean;
	changeSlide: (index: number) => void;
}) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				changeSlide(-1);
			}
			if (e.key === 'ArrowRight') {
				changeSlide(1);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div
			className={cn(
				'absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-5 opacity-0 duration-150',
				previewing && 'opacity-100'
			)}
		>
			<button
				onClick={() => changeSlide(-1)}
				className="cursor-pointer rounded-lg border border-neutral-700 bg-neutral-800 p-2 duration-150 hover:bg-neutral-700"
			>
				<HiArrowLeft />
			</button>
			<button
				onClick={() => changeSlide(1)}
				className="cursor-pointer rounded-lg border border-neutral-700 bg-neutral-800 p-2 duration-150 hover:bg-neutral-700"
			>
				<HiArrowRight />
			</button>
		</div>
	);
}
