import type { IconComponent } from '$components/ui/data-display/icons';
import type {
	ButtonBaseAnchorElement,
	ButtonBaseButtonElement,
	ButtonBaseWithoutHTML,
} from '$components/ui/inputs/button/base';

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
