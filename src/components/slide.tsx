import { Editor } from '@monaco-editor/react';
import { SlideProps } from '../types/SlideTypes';
import { cn } from '../utils/utils';
import { HiOutlineTrash } from 'react-icons/hi2';

export default function Slide({
	index,
	isButton,
	content,
	isSelected,
	title,
	onDelete,
	...props
}: Omit<SlideProps, 'editor'> & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'group relative aspect-video cursor-pointer rounded-lg bg-neutral-900 duration-150',
				isButton && 'hover:bg-neutral-800',
				isSelected && 'ring-2 ring-sky-500'
			)}
			{...props}
		>
			{isButton && (
				<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
					+
				</span>
			)}
			{!isButton && (
				<>
					<span className="absolute bottom-2 left-2 z-20 text-sm font-light">
						{index}
					</span>
					<span
						className="absolute right-1 top-1 z-10 rounded-lg px-2 py-1 opacity-0 group-hover:bg-neutral-700 group-hover:opacity-100"
						onClick={() => {
							if (onDelete) onDelete(index!);
							console.log('clicked');
						}}
					>
						<HiOutlineTrash className="text-md" />
					</span>

					<div className="pointer-events-none absolute inset-0 z-10 rounded-lg bg-gradient-to-b from-transparent via-transparent to-neutral-900"></div>
					{content && (
						<Editor
							theme="vs-dark"
							value={content}
							language="typescript"
							className="slideEditor pointer-events-none"
							options={{
								minimap: {
									enabled: false,
								},
								scrollbar: {
									vertical: 'hidden',
									horizontal: 'hidden',
								},
								renderLineHighlight: 'none',
								fontSize: 2,
								lineNumbers: 'off',
								autoIndent: 'none',
								readOnly: true,
								overviewRulerBorder: false,
							}}
						/>
					)}
				</>
			)}
		</div>
	);
}
