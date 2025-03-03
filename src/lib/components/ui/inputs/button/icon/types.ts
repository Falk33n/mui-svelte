import type {
	ButtonBaseAnchorElement,
	ButtonBaseButtonElement,
	ButtonBaseWithoutHTML,
} from '$components/ui/inputs/button/base';

type IconButtonWithoutHTML = ButtonBaseWithoutHTML;

type WithAriaHidden = {
	'aria-hidden': true;
	'aria-label'?: never;
};

type WithoutAriaHidden = {
	'aria-label': string;
	'aria-hidden'?: false;
};

export type IconButtonProps = IconButtonWithoutHTML &
	(WithAriaHidden | WithoutAriaHidden) &
	(
		| Omit<ButtonBaseButtonElement, 'loadingIconPosition'>
		| Omit<ButtonBaseAnchorElement, 'loadingIconPosition'>
	);
