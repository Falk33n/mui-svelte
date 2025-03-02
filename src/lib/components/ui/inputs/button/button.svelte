<script
	lang="ts"
	module
>
	import type { ButtonProps } from '$components/ui/inputs/button';
	import { ButtonBase } from '$components/ui/inputs/button-base';
	import { getButtonGroupContext } from '$components/ui/inputs/button-group';
	import { cn } from '$utils';
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		'class': className,
		variant = 'contained',
		color = 'primary',
		size = 'md',
		href,
		loadingIconPosition = 'end',
		isLoading = $bindable(href === undefined ? false : undefined),
		'aria-hidden': ariaHidden,
		'aria-busy': ariaBusy = href === undefined && !ariaHidden
			? isLoading
			: undefined,
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

	const reactiveProps = $derived({
		variant,
		color,
		size,
		href,
		loadingIconPosition,
		'aria-hidden': ariaHidden,
		'aria-busy': isLoading || ariaBusy || undefined,
		'class': className ? cn(className) : undefined,
		...restProps,
	});
</script>

<!-- 
  The `as any` on the `reactiveProps` spread fixes the following error... 
    "Expression produces a union type that is too complex to represent (TS2590)".  
  TypeScript cannot compute the full union type, so we use 
    `as any` to bypass the limitation.  
-->
<ButtonBase
	bind:ref
	bind:isLoading
	{...reactiveProps as any}
>
	{#if StartIcon && (isLoading || ariaBusy) && loadingIconPosition !== 'start'}
		<StartIcon />
	{/if}

	{#if loadingText}
		{loadingText}
	{:else}
		{@render children?.()}
	{/if}

	{#if EndIcon && (isLoading || ariaBusy) && loadingIconPosition !== 'end'}
		<EndIcon />
	{/if}
</ButtonBase>
