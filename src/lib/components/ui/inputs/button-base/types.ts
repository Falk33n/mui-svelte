import type { IconComponent } from '$components/ui/data-display/icons';
import type { buttonBaseVariants } from '$components/ui/inputs/button-base';
import type { WithRef } from '$types';
import type {
	FocusEventHandler,
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
	MouseEventHandler,
} from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';

export type ButtonBaseMouseEvent = MouseEvent & {
	currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
};

export type ButtonBaseFocusEvent = FocusEvent & {
	currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
};

export type RippleEvent = ButtonBaseMouseEvent | ButtonBaseFocusEvent;

export type RippleShadeVariant =
	| 'primary'
	| 'destructive'
	| 'background'
	| 'foreground';

export type ButtonBaseVariant = VariantProps<
	typeof buttonBaseVariants
>['variant'];
export type ButtonBaseColor = VariantProps<typeof buttonBaseVariants>['color'];
export type ButtonBaseSize = VariantProps<typeof buttonBaseVariants>['size'];

export type ButtonBaseMouseEventHandler =
	| MouseEventHandler<HTMLButtonElement>
	| MouseEventHandler<HTMLAnchorElement>
	| null;

export type ButtonBaseFocusEventHandler =
	| FocusEventHandler<HTMLButtonElement>
	| FocusEventHandler<HTMLAnchorElement>
	| null;

export type ButtonBaseWithoutHTML = WithRef<{
	variant?: ButtonBaseVariant;
	color?: ButtonBaseColor;
	size?: ButtonBaseSize;
}>;

export type ButtonBaseButtonElement = Omit<HTMLButtonAttributes, 'color'> & {
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
