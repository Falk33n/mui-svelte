<script lang="ts">
	import type { ButtonProps } from '$components/ui/button';
	import { ButtonBase } from '$components/ui/button-base';
	import { getButtonGroupContext } from '$components/ui/button-group';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		'class': className,
		variant,
		color,
		size,
		href,
		loadingIconPosition = 'end',
		isLoading = $bindable(href === undefined ? false : undefined),
		'aria-hidden': ariaHidden,
		'startIcon': StartIcon,
		'endIcon': EndIcon,
		loadingText,
		children,
		...restProps
	}: ButtonProps = $props();

	const groupContext = getButtonGroupContext();

	if (groupContext) {
		variant = groupContext.variant;
		color = groupContext.color;
		size = groupContext.size;
	}
</script>

<!-- Too complex uninion type -->
<ButtonBase
	bind:ref
	bind:isLoading
	aria-busy={href === undefined && !ariaHidden ? isLoading : undefined}
	aria-hidden={ariaHidden}
	class={className ? cn(className) : undefined}
	{loadingIconPosition}
	{variant}
	{color}
	{size}
	{href}
	{...restProps as any}
>
	{#if StartIcon && isLoading && loadingIconPosition !== 'start'}
		<StartIcon />
	{/if}

	{#if loadingText}
		{loadingText}
	{:else}
		{@render children?.()}
	{/if}

	{#if EndIcon && isLoading && loadingIconPosition !== 'end'}
		<EndIcon />
	{/if}
</ButtonBase>
