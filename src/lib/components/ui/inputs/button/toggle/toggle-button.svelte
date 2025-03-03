<script
	lang="ts"
	module
>
	type WithoutHTML = WithRef<{
		color?: ToggleButtonColor;
		size?: ToggleButtonSize;
	}>;

	type WithHTML = Omit<
		HTMLButtonAttributes,
		'aria-label' | 'aria-pressed' | 'value'
	> & {
		'aria-label': string;
		'value': string;
		'defaultPressed'?: boolean;
		'aria-pressed'?: boolean;
	};

	export type ToggleButtonProps = WithoutHTML & WithHTML;
</script>

<script lang="ts">
	import { ButtonBase } from '$components/ui/inputs/button/base';
	import {
		handleToggleButtonPressed,
		toggleButtonVariants,
		type ToggleButtonColor,
		type ToggleButtonSize,
	} from '$components/ui/inputs/button/toggle';
	import { getToggleButtonGroupContext } from '$components/ui/inputs/button/toggle/group';
	import type { ButtonMouseEvent, WithRef } from '$types';
	import { cn } from '$utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		'class': className,
		size = 'md',
		color = 'primary',
		defaultPressed = false,
		'aria-pressed': ariaPressed,
		children,
		onclick,
		...restProps
	}: ToggleButtonProps = $props();

	const groupContext = getToggleButtonGroupContext();

	if (groupContext) {
		color = groupContext.color;
		size = groupContext.size;
	}

	let isSelected = $state({ value: defaultPressed });

	const reactiveProps = $derived({
		'class': cn(toggleButtonVariants({ size, color }), className),
		'aria-pressed': isSelected.value || ariaPressed || false,
		'onclick': (e: ButtonMouseEvent) =>
			handleToggleButtonPressed(
				e,
				ref,
				isSelected,
				onclick,
				groupContext?.selectedButton,
				groupContext?.exclusiveSelection,
				groupContext?.enforcedSelection,
			),
		...restProps,
	});

	if (
		groupContext &&
		(groupContext.exclusiveSelection || groupContext.enforcedSelection)
	) {
		$effect(() => {
			if (groupContext.selectedButton.refs.length === 0 && isSelected.value) {
				groupContext.selectedButton.refs.push(ref);
			}

			isSelected.value = groupContext.selectedButton.refs.includes(ref);
		});
	}
</script>

<ButtonBase
	bind:ref
	{...reactiveProps}
>
	{@render children?.()}
</ButtonBase>
