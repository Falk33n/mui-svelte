<script
	lang="ts"
	module
>
	import {
		buttonGroupVariants,
		setButtonGroupContext,
		type ButtonGroupProps,
	} from '$components/ui/inputs/button/group';
	import { cn } from '$utils';
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		variant = 'contained',
		color = 'primary',
		size = 'md',
		orientation = 'horizontal',
		children,
		...restProps
	}: ButtonGroupProps = $props();

	setButtonGroupContext({ variant, color, size });

	const reactiveProps = $derived({
		'role': 'group',
		'class': cn(
			buttonGroupVariants({
				variant,
				color,
				size,
				orientation,
			}),
			className,
		),
		'aria-orientation': orientation === 'vertical' ? orientation : undefined,
		...restProps,
	});
</script>

<div
	bind:this={ref}
	{...reactiveProps}
>
	{@render children?.()}
</div>
