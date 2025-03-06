import type { WithoutChildren, WithRef } from '$types';
import type {
	HTMLInputAttributes,
	HTMLTextareaAttributes,
} from 'svelte/elements';
import { tv, type VariantProps } from 'tailwind-variants';

export { default as TextField } from '$components/ui/text-field/text-field.svelte';

export const textFieldVariants = tv({
	base: 'peer bg-transparent rounded-md w-full shadow-sm flex border-input items-center justify-center transition-all text-base duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-50 aria-invalid:bg-secondary/60 hover:aria-invalid:bg-secondary focus-visible:aria-invalid:bg-secondary aria-invalid:border-destructive',
	variants: {
		variant: {
			outlined: 'border hover:border-ring',
			filled:
				'bg-secondary/60 text-secondary-foreground rounded-b-none border-b focus-visible:ring-0',
		},
		color: {
			primary: 'focus-visible:border-primary focus-visible:ring-primary/50',
			secondary:
				'hover:border-ring focus-visible:border-ring focus-visible:ring-input/50',
			destructive:
				'focus-visible:border-destructive focus-visible:ring-destructive/50',
		},
		size: {
			sm: 'px-3.5 py-2 text-sm',
			md: 'px-4 py-2',
			lg: 'px-5 py-2.5',
		},
		multipleLines: {
			true: 'field-sizing-content resize-none',
		},
	},
	compoundVariants: [
		{
			size: 'sm',
			multipleLines: true,
			class: 'min-h-9 max-h-[200px] scroll-py-2',
		},
		{
			size: 'md',
			multipleLines: true,
			class: 'min-h-10 max-h-[250px] scroll-py-2',
		},
		{
			size: 'lg',
			multipleLines: true,
			class: 'min-h-11 max-h-[300px] scroll-py-2.5',
		},
		{
			size: 'sm',
			multipleLines: false,
			class: 'h-9',
		},
		{
			size: 'md',
			multipleLines: false,
			class: 'h-10',
		},
		{
			size: 'lg',
			multipleLines: false,
			class: 'h-11',
		},
		{
			variant: 'filled',
			color: 'primary',
			class: 'hover:bg-primary/10 focus-visible:bg-primary/10',
		},
		{
			variant: 'filled',
			color: 'secondary',
			class: 'hover:bg-secondary focus-visible:bg-secondary',
		},
		{
			variant: 'filled',
			color: 'destructive',
			class: 'hover:bg-destructive/5 focus-visible:bg-destructive/5',
		},
	],
	defaultVariants: {
		variant: 'outlined',
		color: 'primary',
		size: 'md',
		multipleLines: false,
	},
});

export type TextFieldVariant = VariantProps<
	typeof textFieldVariants
>['variant'];

export type TextFieldColor = VariantProps<typeof textFieldVariants>['color'];

export type TextFieldSize = VariantProps<typeof textFieldVariants>['size'];

export type TextFieldMultipleLines = VariantProps<
	typeof textFieldVariants
>['multipleLines'];

type WithoutHTML = WithRef<{
	variant?: TextFieldVariant;
	color?: TextFieldColor;
	size?: TextFieldSize;
}>;

type TextareaAttributes = WithoutChildren<
	Omit<HTMLTextareaAttributes, 'aria-label' | 'aria-labelledby' | 'value'>
>;

type TextareaElementWithoutInputAttributes = {
	value?: HTMLTextareaAttributes['value'];
	accept?: never;
	alt?: never;
	capture?: never;
	checked?: never;
	formaction?: never;
	formenctype?: never;
	formmethod?: never;
	formnovalidate?: never;
	formtarget?: never;
	height?: never;
	list?: never;
	max?: never;
	min?: never;
	multiple?: never;
	pattern?: never;
	popovertarget?: never;
	popovertargetaction?: never;
	src?: never;
	step?: never;
	width?: never;
	multipleLines?: true;
};

type TextareaElement = TextareaAttributes &
	TextareaElementWithoutInputAttributes;

type InputAttributes = WithoutChildren<
	Omit<HTMLInputAttributes, 'aria-label' | 'aria-labelledby' | 'size' | 'value'>
>;

type InputElementWithoutTextareaAttributes = {
	value?: HTMLTextareaAttributes['value'];
	autocorrect?: never;
	cols?: never;
	rows?: never;
	spellcheck?: never;
	wrap?: never;
	multipleLines?: false;
};

type InputElement = InputAttributes & InputElementWithoutTextareaAttributes;

export type TextFieldProps = WithoutHTML & (TextareaElement | InputElement);
