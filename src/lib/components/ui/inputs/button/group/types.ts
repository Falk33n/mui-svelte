import type { buttonGroupVariants } from '$components/ui/inputs/button/group';
import type { WithRef } from '$types';
import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';

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

type ButtonGroupWithoutHTML = WithRef<{
	variant?: ButtonGroupVariant;
	color?: ButtonGroupColor;
	size?: ButtonGroupSize;
	orientation?: ButtonGroupOrientation;
}>;

export type ButtonGroupContextProps = Required<
	Omit<ButtonGroupWithoutHTML, 'ref' | 'orientation'>
>;

export type ButtonGroupProps = ButtonGroupWithoutHTML &
	Omit<
		HTMLAttributes<HTMLDivElement>,
		'aria-label' | 'role' | 'aria-orientation'
	> & {
		'aria-label': string;
	};
