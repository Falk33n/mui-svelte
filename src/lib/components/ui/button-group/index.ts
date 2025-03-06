import type { WithRef } from '$types';
import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export {
	default as ButtonGroup,
	getButtonGroupContext,
} from '$components/ui/button-group/button-group.svelte';

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

export type ButtonGroupVariant = VariantProps<
	typeof buttonGroupVariants
>['variant'];

export type ButtonGroupColor = VariantProps<
	typeof buttonGroupVariants
>['color'];

export type ButtonGroupSize = VariantProps<typeof buttonGroupVariants>['size'];

export type ButtonGroupOrientation = VariantProps<
	typeof buttonGroupVariants
>['orientation'];

type DivAttributes = Omit<
	HTMLAttributes<HTMLDivElement>,
	'aria-label' | 'role' | 'aria-orientation'
>;

type WithoutHTML = WithRef<{
	variant?: ButtonGroupVariant;
	color?: ButtonGroupColor;
	size?: ButtonGroupSize;
	orientation?: ButtonGroupOrientation;
}>;

type WithHTML = DivAttributes & {
	'aria-label': string;
};

export type ButtonGroupProps = WithoutHTML & WithHTML;
