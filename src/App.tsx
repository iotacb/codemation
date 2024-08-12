import { AnimatePresence, Reorder } from 'framer-motion';
import { useState } from 'react';
import Button from './components/button';
import { SlideProps } from './types/SlideTypes';
import { cn } from './utils/utils';
import { hidden, visible } from './utils/slide-animations';
import Slide from './components/slide';
import DisplayedSlide from './components/displayed-slide';

export default function App() {
	const [slides, setSlides] = useState<SlideProps[]>([
		{ content: 'Write your code here!' },
		{ content: 'Create multiple slides to create a presentation!' },
	]);
	const [currSlideIndex, setCurrSlideIndex] = useState<number>(0);

	const [previewing, setPreviewing] = useState<boolean>(false);

	function addSlide() {
		setSlides([...slides, { content: 'New Slide' + slides.length }]);
	}

	function deleteSlide(index: number) {
		setSlides((prevSlides) => {
			const updatedSlides = prevSlides.filter((_, i) => i !== index);

			updateSelectedSlide(0);

			return updatedSlides;
		});
	}

	function updateSelectedSlide(index: number) {
		setCurrSlideIndex(index);
	}

	function changeSlide(index: number) {
		setCurrSlideIndex((prevIndex) => {
			const newIndex =
				(prevIndex + index + slides.length) % slides.length;
			return newIndex;
		});
	}

	return (
		<main className="relative grid h-dvh w-full grid-cols-[auto,1fr]">
			<Reorder.Group
				axis="y"
				onReorder={(order) => {
					order.map((item, index) => {
						const active = slides[currSlideIndex];
						if (active === item) {
							setCurrSlideIndex(index);
						}
					});
					setSlides(order);
				}}
				values={slides}
				className="relative flex h-full w-40 flex-col gap-4 border-r border-r-zinc-700 p-4"
			>
				<div
					className={cn(
						'pointer-events-none absolute inset-0 z-50 bg-black/80 opacity-0 duration-150',
						previewing && 'pointer-events-auto opacity-100'
					)}
				></div>
				<AnimatePresence>
					{slides.map((slide, index) => (
						<Reorder.Item
							initial={hidden}
							animate={visible}
							exit={hidden}
							onClick={() => updateSelectedSlide(index)}
							value={slide}
							key={slide.content}
						>
							<Slide
								isSelected={index === currSlideIndex}
								index={index + 1}
								onDelete={() => deleteSlide(index)}
								{...slide}
							/>
						</Reorder.Item>
					))}
					<Slide onClick={addSlide} isButton />
				</AnimatePresence>
			</Reorder.Group>
			<div className="noise flex h-full w-full flex-col items-center justify-center gap-10 p-10">
				<DisplayedSlide
					index={currSlideIndex}
					previewing={previewing}
					content={slides[currSlideIndex]?.content ?? ''}
					changeSlide={changeSlide}
					onChange={(value) => {
						const slide = slides[currSlideIndex];
						slide.content = value;
					}}
				/>
				<div className="flex gap-10">
					<Button
						className={cn(
							previewing && 'bg-sky-600 hover:bg-sky-700'
						)}
						onClick={() => setPreviewing(!previewing)}
					>
						{previewing ? 'Exit Preview' : 'Preview'}
					</Button>
					<Button disabled onClick={() => console.log('clicked')}>
						Export
					</Button>
				</div>
			</div>
			<span className="absolute bottom-5 right-10 animate-pulse">
				Made with 🤍 by{' '}
				<a className="underline" href="https://chrisbrandt.xyz">
					Chris.
				</a>
			</span>
		</main>
	);
}
