<script lang="ts">
	import { ButtonBase } from '$components/ui/button-base';
	import {
		iconButtonVariants,
		type IconButtonProps,
	} from '$components/ui/icon-button';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		'class': className,
		size = 'md',
		href,
		isLoading = $bindable(href === undefined ? false : undefined),
		'aria-hidden': ariaHidden,
		children,
		...restProps
	}: IconButtonProps = $props();
</script>

<!-- Too complex uninion type -->
<ButtonBase
	bind:ref
	bind:isLoading
	aria-hidden={ariaHidden}
	aria-busy={href === undefined && !ariaHidden ? isLoading : undefined}
	class={cn(iconButtonVariants({ size }), className)}
	{href}
	{...restProps as any}
>
	{#if !isLoading}
		{@render children?.()}
	{/if}
</ButtonBase>
