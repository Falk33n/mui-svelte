import type { ButtonGroupContextProps } from '$components/ui/inputs/button/group';
import { getContext, hasContext, setContext } from 'svelte';
import { tv } from 'tailwind-variants';

export const buttonGroupVariants = tv({
	base: 'group rounded-md bg-transparent inline-flex items-center justify-center [&>*]:rounded-none [&>*]:focus-visible:z-1',
	variants: {
		variant: {
			text: '',
			contained: 'shadow-md [&>*]:shadow-none',
			outlined: '',
		},
		color: {
			primary: '',
			secondary: '',
			destructive: '',
		},
		size: {
			sm: 'h-8',
			md: 'h-9',
			lg: 'h-10',
		},
		orientation: {
			horizontal:
				'[&>*]:first:rounded-l-md [&>*]:last:rounded-r-md [&>*]:border-r [&>*]:last:border-r-0',
			vertical:
				'flex-col h-[unset] [&>*]:w-full [&>*]:first:rounded-t-md [&>*]:last:rounded-b-md [&>*]:border-b [&>*]:last:border-b-0',
		},
	},
	compoundVariants: [
		{
			size: 'sm',
			orientation: 'vertical',
			class: '[&>*]:h-8',
		},
		{
			size: 'md',
			orientation: 'vertical',
			class: '[&>*]:h-9',
		},
		{
			size: 'lg',
			orientation: 'vertical',
			class: '[&>*]:h-10',
		},
		{
			variant: 'outlined',
			orientation: 'horizontal',
			class: 'border-x [&>*]:border-l-0',
		},
		{
			variant: 'outlined',
			orientation: 'vertical',
			class: 'border-y [&>*]:border-t-0',
		},
		{
			variant: 'outlined',
			orientation: 'vertical',
			class: 'border-y',
		},
		{
			variant: 'contained',
			color: 'primary',
			class:
				'[&>*]:border-[hsl(221,83%,43%)] dark:[&>*]:border-[hsl(226,71%,53%)]',
		},
		{
			variant: 'contained',
			color: 'destructive',
			class: '[&>*]:border-[hsl(0,72%,43%)] dark:[&>*]:border-[hsl(0,74%,50%)]',
		},
		{
			variant: ['text', 'outlined'],
			color: 'primary',
			class: '[&>*]:border-primary/70',
		},
		{
			variant: 'outlined',
			color: 'primary',
			class: 'border-primary/70',
		},
		{
			variant: ['text', 'outlined'],
			color: 'destructive',
			class: '[&>*]:border-destructive/70',
		},
		{
			variant: 'outlined',
			color: 'destructive',
			class: 'border-destructive/70',
		},
	],
	defaultVariants: {
		variant: 'contained',
		color: 'primary',
		size: 'md',
		orientation: 'horizontal',
	},
});

const BUTTON_GROUP_CONTEXT_NAME = 'button-group';

export const getButtonGroupContext = () => {
	if (!hasContext(BUTTON_GROUP_CONTEXT_NAME)) return;
	return getContext<ButtonGroupContextProps>(BUTTON_GROUP_CONTEXT_NAME);
};

export const setButtonGroupContext = (props: ButtonGroupContextProps) => {
	return setContext<ButtonGroupContextProps>(BUTTON_GROUP_CONTEXT_NAME, props);
};
