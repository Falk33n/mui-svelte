<script
	lang="ts"
	module
>
	import {
		setToggleButtonGroupContext,
		toggleButtonGroupVariants,
		type ToggleButtonGroupProps,
	} from '$components/ui/inputs/button/toggle/group';
	import { cn } from '$utils';
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		color = 'primary',
		size = 'md',
		orientation = 'horizontal',
		exclusiveSelection = false,
		enforcedSelection = false,
		children,
		...restProps
	}: ToggleButtonGroupProps = $props();

	let selectedButton = $state<{ refs: (HTMLElement | null)[] }>({ refs: [] });

	setToggleButtonGroupContext({
		color,
		size,
		exclusiveSelection,
		enforcedSelection,
		selectedButton,
	});

	const reactiveProps = $derived({
		'aria-orientation': orientation === 'vertical' ? orientation : undefined,
		'role': 'group',
		'class': cn(
			toggleButtonGroupVariants({
				color,
				size,
				orientation,
			}),
			className,
		),
		...restProps,
	});
</script>

<div
	bind:this={ref}
	{...reactiveProps}
>
	{@render children?.()}
</div>
