import type { ToggleButtonGroupContextProps } from '$components/ui/inputs/button/toggle/group';
import { getContext, hasContext, setContext } from 'svelte';
import { tv } from 'tailwind-variants';

export const toggleButtonGroupVariants = tv({
	base: 'group rounded-md bg-transparent inline-flex items-center justify-center [&>*]:rounded-none [&>*]:focus-visible:z-1',
	variants: {
		color: {
			primary: '',
			secondary: '',
			destructive: '',
		},
		size: {
			sm: 'h-8',
			md: 'h-10',
			lg: 'h-12',
		},
		orientation: {
			horizontal:
				'[&>*]:first:rounded-l-md [&>*]:last:rounded-r-md [&>*]:border-l-0 [&>*]:border-r [&>*]:first:border-l',
			vertical:
				'flex-col h-[unset] [&>*]:w-full [&>*]:first:rounded-t-md [&>*]:last:rounded-b-md [&>*]:border-t-0 [&>*]:first:border-t [&>*]:border-b',
		},
	},
	compoundVariants: [
		{
			size: 'sm',
			orientation: 'vertical',
			class: 'w-8',
		},
		{
			size: 'md',
			orientation: 'vertical',
			class: 'w-10',
		},
		{
			size: 'lg',
			orientation: 'vertical',
			class: 'w-12',
		},
	],
	defaultVariants: {
		color: 'primary',
		size: 'md',
		orientation: 'horizontal',
	},
});

const TOGGLE_BUTTON_GROUP_CONTEXT_NAME = 'toggle-button-group';

export const getToggleButtonGroupContext = () => {
	if (!hasContext(TOGGLE_BUTTON_GROUP_CONTEXT_NAME)) return;
	return getContext<ToggleButtonGroupContextProps>(
		TOGGLE_BUTTON_GROUP_CONTEXT_NAME,
	);
};

export const setToggleButtonGroupContext = (
	props: ToggleButtonGroupContextProps,
) => {
	return setContext<ToggleButtonGroupContextProps>(
		TOGGLE_BUTTON_GROUP_CONTEXT_NAME,
		props,
	);
};
