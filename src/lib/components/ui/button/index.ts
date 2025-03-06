import type {
	ButtonBaseAnchorElement,
	ButtonBaseButtonElement,
	ButtonBaseWithoutHTML,
} from '$components/ui/button-base';
import type { IconComponent } from '$components/ui/icons';

export { default as Button } from '$components/ui/button/button.svelte';

type ButtonWithoutHTML = ButtonBaseWithoutHTML & {
	startIcon?: IconComponent;
	endIcon?: IconComponent;
};

type ButtonElement = ButtonBaseButtonElement & {
	loadingText?: string;
};

type AnchorElement = ButtonBaseAnchorElement & {
	loadingText?: never;
};

export type ButtonProps = ButtonWithoutHTML & (ButtonElement | AnchorElement);
