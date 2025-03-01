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
	import { cn } from '$utils';

	export type ButtonProps = Omit<ButtonBaseWithoutHTML, 'size'> &
		(
			| Omit<ButtonBaseButtonElement, 'loadingIconPosition'>
			| Omit<ButtonBaseAnchorElement, 'loadingIconPosition'>
		);

	/* 	type WithIconSizeAndAriaLabel = {
		'size': 'icon';
		'aria-label': string;
		'aria-hidden'?: false;
	};

	type WithIconSizeAndAriaHidden = {
		'size': 'icon';
		'aria-hidden': true;
		'aria-label'?: never;
		'startIcon'?: never;
		'endIcon'?: never;
	};

	type WithoutIconSize = {
		size?: Exclude<ButtonSize, 'icon'>;
		startIcon?: IconType;
		endIcon?: IconType;
	};

	type IconButtonBaseProps =
		| WithIconSizeAndAriaLabel
		| WithIconSizeAndAriaHidden
		| WithoutIconSize; */
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
		type = href === undefined ? 'button' : undefined,
		children,
		...restProps
	}: ButtonProps = $props();

	const mergedProps = $derived({
		type,
		href,
		'aria-hidden': ariaHidden,
		'aria-busy': isLoading || ariaBusy,
		'class': cn('size-10 rounded-full'),
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
	{#if !isLoading && !ariaBusy}
		{@render children?.()}
	{/if}
</ButtonBase>
