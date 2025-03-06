import type { LabelProps } from '$components/ui/label';
import { tv, type VariantProps } from 'tailwind-variants';

export { default as TextFieldLabel } from '$components/ui/text-field-label/text-field-label.svelte';

export const textFieldLabelVariants = tv({
	base: 'pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 cursor-text rounded-full bg-transparent px-2.5 py-0.5 transition-all duration-200 group-data-[input-required]:after:text-destructive group-focus-within:pointer-events-auto group-focus-within:top-0 group-focus-within:-translate-y-2 group-focus-within:text-sm group-data-[input-has-value]:top-0 group-data-[input-has-value]:-translate-y-2 group-data-[input-disabled]:opacity-50 group-data-[input-has-value]:pointer-events-auto group-data-[input-has-value]:text-sm group-data-[input-placeholder-shown]:pointer-events-auto group-data-[input-placeholder-shown]:top-0 group-data-[input-placeholder-shown]:-translate-y-2 group-data-[input-placeholder-shown]:text-sm group-data-[input-required]:after:content-["*"] group-data-[input-invalid]:text-destructive group-focus-within:font-semibold group-data-[input-has-value]:font-semibold group-data-[input-placeholder-shown]:font-semibold',
	variants: {
		variant: {
			outlined: '',
			filled: '',
		},
		color: {
			primary: '',
			secondary:
				'group-focus-within:bg-secondary group-data-[input-has-value]:bg-secondary group-data-[input-placeholder-shown]:bg-secondary',
			destructive: '',
		},
		size: {
			sm: '',
			md: '',
			lg: '',
		},
		multipleLines: {
			true: '',
		},
	},
	compoundVariants: [
		{
			size: 'sm',
			multipleLines: false,
			class: '',
		},
		{
			size: 'md',
			multipleLines: false,
			class: '',
		},
		{
			size: 'lg',
			multipleLines: false,
			class: '',
		},
	],
	defaultVariants: {
		variant: 'outlined',
		color: 'primary',
		size: 'md',
		multipleLines: false,
	},
});

export type TextFieldLabelVariant = VariantProps<
	typeof textFieldLabelVariants
>['variant'];

export type TextFieldLabelColor = VariantProps<
	typeof textFieldLabelVariants
>['color'];

export type TextFieldLabelSize = VariantProps<
	typeof textFieldLabelVariants
>['size'];

export type TextFieldLabelMultipleLines = VariantProps<
	typeof textFieldLabelVariants
>['multipleLines'];

type WithoutHTML = {
	variant?: TextFieldLabelVariant;
	color?: TextFieldLabelColor;
	size?: TextFieldLabelSize;
	multipleLines?: TextFieldLabelMultipleLines;
};

type LabelPropsWithForRequired = Omit<LabelProps, 'for'> & { for: string };

export type FormTextFieldLabelProps = WithoutHTML & LabelPropsWithForRequired;
