export type SlideProps = {
	index?: number;
	content?: string;
	title?: string;
	isButton?: boolean;
	isSelected?: boolean;
	onDelete?: (index: number) => void;
};

export type DisplayedSlideProps = {
	index: number;
	content?: string;
	previewing?: boolean;
	title?: string;
	changeSlide?: (index: number) => void;
	onChange?: (value: string) => void;
};
