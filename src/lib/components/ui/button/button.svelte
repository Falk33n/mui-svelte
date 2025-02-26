<script
	lang="ts"
	module
>
	import {
		ButtonBase,
		type ButtonBaseAnchorElement,
		type ButtonBaseButtonElement,
		type ButtonBaseWithoutHTML,
	} from '$components/ui/button';
	import { type IconType } from '$components/ui/icons';
	import { cn } from '$utils';

	type ButtonWithoutHTML = ButtonBaseWithoutHTML & {
		startIcon?: IconType;
		endIcon?: IconType;
	};

	type ButtonElement = ButtonBaseButtonElement & {
		loadingText?: string;
	};

	type AnchorElement = ButtonBaseAnchorElement & {
		loadingText?: never;
	};

	export type ButtonProps = ButtonWithoutHTML & (ButtonElement | AnchorElement);
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		'class': className,
		href,
		isLoading = $bindable(href === undefined ? false : undefined),
		'aria-hidden': ariaHidden,
		'aria-busy': ariaBusy = href === undefined && !ariaHidden
			? isLoading
			: undefined,
		'startIcon': StartIcon,
		'endIcon': EndIcon,
		loadingText,
		type = href === undefined ? 'button' : undefined,
		children,
		...restProps
	}: ButtonProps = $props();

	const mergedProps = $derived({
		type,
		href,
		'aria-hidden': ariaHidden,
		'aria-busy': isLoading || ariaBusy,
		'class': className ? cn(className) : undefined,
		...restProps,
	});
</script>

<!-- 
  The `as any` on the mergedProps spread fixes the following error... 
    "Expression produces a union type that is too complex to represent (TS2590)".  
  TypeScript cannot compute the full union type, so we use 
    `as any` to bypass the limitation.  
-->
<ButtonBase
	bind:ref
	bind:isLoading
	{...mergedProps as any}
>
	{#if isLoading || ariaBusy}
		{#if loadingText}
			{loadingText}
		{:else}
			{@render children?.()}
		{/if}
	{:else}
		{#if StartIcon}
			<StartIcon />
		{/if}

		{@render children?.()}

		{#if EndIcon}
			<EndIcon />
		{/if}
	{/if}
</ButtonBase>
