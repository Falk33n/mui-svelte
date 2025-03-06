<script lang="ts">
	import { ButtonBase } from '$components/ui/button-base';
	import {
		toggleButtonVariants,
		type ToggleButtonProps,
	} from '$components/ui/toggle-button';
	import { getToggleButtonGroupContext } from '$components/ui/toggle-button-group';
	import type { ButtonMouseEvent } from '$types';
	import { cn } from '$utils';

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
