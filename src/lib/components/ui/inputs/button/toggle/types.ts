import type { toggleButtonVariants } from '$components/ui/inputs/button/toggle';
import type { WithRef } from '$types';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';

export type ToggleButtonColor = VariantProps<
	typeof toggleButtonVariants
>['color'];
export type ToggleButtonSize = VariantProps<
	typeof toggleButtonVariants
>['size'];

type ToggleButtonWithoutHTML = WithRef<{
	color?: ToggleButtonColor;
	size?: ToggleButtonSize;
}>;

type ToggleButtonWithHTML = Omit<
	HTMLButtonAttributes,
	'aria-label' | 'aria-pressed' | 'value'
> & {
	'aria-label': string;
	'value': string;
	'defaultPressed'?: boolean;
	'aria-pressed'?: boolean;
};

export type ToggleButtonProps = ToggleButtonWithoutHTML & ToggleButtonWithHTML;
