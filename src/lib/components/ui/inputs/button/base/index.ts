import type { IconComponent } from '$components/ui/data-display/icons';
import type { WithRef } from '$types';
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export { default as ButtonBase } from '$components/ui/inputs/button/base/button-base.svelte';

export const buttonBaseVariants = tv({
	base: 'relative overflow-hidden bg-transparent rounded-md gap-2 inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium transition-all text-base duration-200 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-50 [&>svg]:size-5',
	variants: {
		variant: {
			text: '',
			link: 'hover:underline hover:underline-offset-2 font-normal normal-case',
			contained: 'shadow-md',
			outlined: 'border disabled:border-secondary-foreground/40',
		},
		color: {
			primary: '',
			secondary: '',
			destructive: '',
		},
		size: {
			sm: 'h-8 px-3.5 text-sm [&>svg]:size-4',
			md: 'h-9 px-5',
			lg: 'h-10 px-5',
		},
	},
	compoundVariants: [
		{
			variant: 'link',
			size: ['sm', 'md', 'lg'],
			class: 'h-[unset] px-[unset]',
		},
		{
			variant: ['text', 'link', 'outlined'],
			color: 'primary',
			class: 'text-primary',
		},
		{
			variant: ['text', 'link', 'contained', 'outlined'],
			color: 'secondary',
			class: 'text-secondary-foreground',
		},
		{
			variant: ['text', 'link', 'outlined'],
			color: 'destructive',
			class: 'text-destructive',
		},
		{
			variant: ['text', 'outlined'],
			color: 'primary',
			class: 'hover:bg-primary/10',
		},
		{
			variant: ['text', 'outlined', 'contained'],
			color: 'secondary',
			class: 'hover:bg-secondary',
		},
		{
			variant: ['text', 'outlined'],
			color: 'destructive',
			class: 'hover:bg-destructive/10',
		},
		{
			variant: 'contained',
			color: 'primary',
			class: 'bg-primary text-primary-foreground hover:bg-primary/80',
		},
		{
			variant: 'contained',
			color: 'secondary',
			class: 'bg-secondary',
		},
		{
			variant: 'contained',
			color: 'destructive',
			class:
				'bg-destructive text-destructive-foreground hover:bg-destructive/80',
		},
		{
			variant: 'outlined',
			color: 'primary',
			class: 'border-primary/70',
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
	},
});

export type ButtonBaseVariant = VariantProps<
	typeof buttonBaseVariants
>['variant'];
export type ButtonBaseColor = VariantProps<typeof buttonBaseVariants>['color'];
export type ButtonBaseSize = VariantProps<typeof buttonBaseVariants>['size'];

export type ButtonBaseWithoutHTML = WithRef<{
	variant?: ButtonBaseVariant;
	color?: ButtonBaseColor;
	size?: ButtonBaseSize;
	asFloatingAction?: boolean;
}>;

export type ButtonBaseButtonElement = Omit<
	HTMLButtonAttributes,
	'color' | 'aria-busy'
> & {
	href?: never;
	hreflang?: never;
	ping?: never;
	referrerpolicy?: never;
	rel?: never;
	target?: never;
	download?: never;
	isLoading?: boolean;
	loadingIcon?: IconComponent;
	loadingIconPosition?: 'start' | 'end';
};

export type ButtonBaseAnchorElement = Omit<
	HTMLAnchorAttributes,
	'href' | 'color'
> & {
	href: string;
	type?: never;
	disabled?: never;
	autofocus?: never;
	form?: never;
	formaction?: never;
	formenctype?: never;
	formmethod?: never;
	formnovalidate?: never;
	formtarget?: never;
	name?: never;
	popovertarget?: never;
	popovertargetaction?: never;
	value?: never;
	isLoading?: never;
	loadingIcon?: never;
	loadingIconPosition?: never;
};

export type ButtonBaseProps = ButtonBaseWithoutHTML &
	(ButtonBaseButtonElement | ButtonBaseAnchorElement);
