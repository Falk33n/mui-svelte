import type {
	ButtonBaseAnchorElement,
	ButtonBaseButtonElement,
	ButtonBaseWithoutHTML,
} from '$components/ui/button-base';
import { tv, type VariantProps } from 'tailwind-variants';

export { default as IconButton } from '$components/ui/icon-button/icon-button.svelte';

export const iconButtonVariants = tv({
	base: 'rounded-full px-[unset]',
	variants: {
		size: {
			sm: 'size-8 [&>svg]:size-5',
			md: 'size-10 [&>svg]:size-6',
			lg: 'size-12 [&>svg]:size-7',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

export type IconButtonSize = VariantProps<typeof iconButtonVariants>['size'];

type WithoutHTML = Omit<ButtonBaseWithoutHTML, 'size'> & {
	size?: IconButtonSize;
};

type WithAriaHidden = {
	'aria-hidden': true;
	'aria-label'?: never;
};

type WithoutAriaHidden = {
	'aria-label': string;
	'aria-hidden'?: false;
};

type ButtonElement = Omit<ButtonBaseButtonElement, 'loadingIconPosition'>;

type AnchorElement = Omit<ButtonBaseAnchorElement, 'loadingIconPosition'>;

export type IconButtonProps = WithoutHTML &
	(WithAriaHidden | WithoutAriaHidden) &
	(ButtonElement | AnchorElement);
