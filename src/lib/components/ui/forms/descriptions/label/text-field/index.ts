import { tv } from 'tailwind-variants';

export const textFieldLabelVariants = tv({
	variants: {
		variant: {
			outlined: '',
			filled: '',
		},
		color: {
			primary: '',
			secondary: '',
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
