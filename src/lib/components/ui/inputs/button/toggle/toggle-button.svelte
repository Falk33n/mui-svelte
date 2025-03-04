<script
	lang="ts"
	module
>
	import { ButtonBase } from '$components/ui/inputs/button/base';
	import {
		toggleButtonVariants,
		type ToggleButtonColor,
		type ToggleButtonSize,
	} from '$components/ui/inputs/button/toggle';
	import { getToggleButtonGroupContext } from '$components/ui/inputs/button/toggle/group';
	import type { ButtonMouseEvent, WithRef } from '$types';
	import { cn } from '$utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

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
		'defaultSelected'?: boolean;
	};

	export type ToggleButtonProps = WithoutHTML & WithHTML;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		size = 'md',
		color = 'primary',
		defaultSelected = false,
		children,
		onclick,
		...restProps
	}: ToggleButtonProps = $props();

	const groupContext = getToggleButtonGroupContext();

	if (groupContext) {
		color = groupContext.color;
		size = groupContext.size;
	}

	let isSelected = $state({ value: defaultSelected });

	function handleMouseEvent(e: ButtonMouseEvent) {
		if (!e.defaultPrevented) {
			if (groupContext) {
				const { enforcedSelection, exclusiveSelection, selectedButton } =
					groupContext;

				if (exclusiveSelection) {
					const handleExclusiveSelection = () => {
						if (
							enforcedSelection &&
							selectedButton.refs.includes(ref) &&
							selectedButton.refs.length === 1
						) {
							onclick?.(e);
							return { escapeEarly: true };
						}

						if (!selectedButton.refs.includes(ref)) selectedButton.refs = [ref];
						else if (!enforcedSelection || selectedButton.refs.length > 1) {
							selectedButton.refs = [];
						}
					};

					if (handleExclusiveSelection()?.escapeEarly) return;
				} else {
					const handleNormalSelection = () => {
						if (
							enforcedSelection &&
							isSelected.value &&
							selectedButton.refs.includes(ref) &&
							selectedButton.refs.length === 1
						) {
							onclick?.(e);
							return { escapeEarly: true };
						}

						if (isSelected.value) {
							selectedButton.refs.splice(selectedButton.refs.indexOf(ref), 1);
						} else selectedButton.refs.push(ref);
					};

					if (handleNormalSelection()?.escapeEarly) return;
				}

				onclick?.(e);
				return;
			}

			isSelected.value = !isSelected.value;
		}

		onclick?.(e);
	}

	if (
		groupContext &&
		(groupContext.enforcedSelection || groupContext.exclusiveSelection)
	) {
		$effect(() => {
			isSelected.value =
				groupContext.selectedButton.refs.includes(ref) || false;
		});
	}
</script>

<ButtonBase
	bind:ref
	class={cn(toggleButtonVariants({ size, color }), className)}
	aria-pressed={isSelected.value}
	onclick={handleMouseEvent}
	{...restProps}
>
	{@render children?.()}
</ButtonBase>
