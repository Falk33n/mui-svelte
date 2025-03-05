import { iconButtonVariants } from '$components/ui/forms/button/icon';
import { tv, type VariantProps } from 'tailwind-variants';

export {
	default as ToggleButton,
	type ToggleButtonProps,
} from '$components/ui/forms/button/toggle/toggle-button.svelte';

export const toggleButtonVariants = tv({
	extend: iconButtonVariants,
	base: 'rounded-md bg-transparent border shadow-none text-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground',
	variants: {
		color: {
			primary:
				'aria-pressed:text-primary aria-pressed:bg-primary/15 aria-pressed:border-primary/40',
			secondary:
				'aria-pressed:text-secondary-foreground aria-pressed:bg-secondary-foreground/10',
			destructive:
				'aria-pressed:text-destructive aria-pressed:bg-destructive/15 aria-pressed:border-destructive/40',
		},
	},
	defaultVariants: {
		color: 'primary',
		size: 'md',
	},
});

export type ToggleButtonColor = VariantProps<
	typeof toggleButtonVariants
>['color'];

export type ToggleButtonSize = VariantProps<
	typeof toggleButtonVariants
>['size'];
