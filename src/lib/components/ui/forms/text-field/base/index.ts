import { tv, type VariantProps } from 'tailwind-variants';

export {
	default as TextField,
	type TextFieldProps,
} from '$components/ui/forms/text-field/base/text-field-base.svelte';

export const textFieldVariants = tv({
	base: 'bg-transparent rounded-md w-full shadow-sm my-3 flex border-input items-center justify-center transition-all text-base duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-50',
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
			class: 'hover:bg-secondary focus-visible:bg-secondary ',
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
