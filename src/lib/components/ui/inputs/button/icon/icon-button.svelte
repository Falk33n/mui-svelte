<script
	lang="ts"
	module
>
	import { ButtonBase } from '$components/ui/inputs/button/base';
	import type { IconButtonProps } from '$components/ui/inputs/button/icon';
	import { cn } from '$utils';
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		'class': className,
		size = 'md',
		href,
		isLoading = $bindable(href === undefined ? false : undefined),
		'aria-hidden': ariaHidden,
		'aria-busy': ariaBusy = href === undefined && !ariaHidden
			? isLoading
			: undefined,
		children,
		...restProps
	}: IconButtonProps = $props();

	const reactiveProps = $derived({
		href,
		'aria-hidden': ariaHidden,
		'aria-busy': isLoading || ariaBusy || undefined,
		'class': cn(
			'px-[unset] rounded-full',
			size === 'sm'
				? 'size-8 [&>svg]:size-5'
				: size === 'md'
					? 'size-10 [&>svg]:size-6'
					: 'size-12 [&>svg]:size-7',
			className,
		),
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
	{#if !isLoading && !ariaBusy}
		{@render children?.()}
	{/if}
</ButtonBase>
