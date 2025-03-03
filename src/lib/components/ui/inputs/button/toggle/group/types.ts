import type { toggleButtonGroupVariants } from '$components/ui/inputs/button/toggle/group';
import type { WithRef } from '$types';
import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';

export type ToggleButtonGroupColor = VariantProps<
	typeof toggleButtonGroupVariants
>['color'];

export type ToggleButtonGroupSize = VariantProps<
	typeof toggleButtonGroupVariants
>['size'];

export type ToggleButtonGroupOrientation = VariantProps<
	typeof toggleButtonGroupVariants
>['orientation'];

type ToggleButtonGroupWithoutHTML = WithRef<{
	color?: ToggleButtonGroupColor;
	size?: ToggleButtonGroupSize;
	orientation?: ToggleButtonGroupOrientation;
	exclusiveSelection?: boolean;
	enforcedSelection?: boolean;
}>;

export type ToggleButtonGroupContextProps = Required<
	Omit<ToggleButtonGroupWithoutHTML, 'ref' | 'orientation'>
> & {
	selectedButton: { refs: (HTMLElement | null)[] };
};

export type ToggleButtonGroupProps = ToggleButtonGroupWithoutHTML &
	Omit<
		HTMLAttributes<HTMLDivElement>,
		'aria-label' | 'role' | 'aria-orientation'
	> & {
		'aria-label': string;
	};
