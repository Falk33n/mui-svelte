import type { toggleButtonVariants } from '$components/ui/inputs/button/toggle';
import type { VariantProps } from 'tailwind-variants';

export type ToggleButtonColor = VariantProps<
	typeof toggleButtonVariants
>['color'];
export type ToggleButtonSize = VariantProps<
	typeof toggleButtonVariants
>['size'];
