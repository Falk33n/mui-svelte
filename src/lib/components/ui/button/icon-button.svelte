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

	type IconButtonWithoutHTML = Omit<ButtonBaseWithoutHTML, 'size'>;

	type WithAriaHidden = {
		'aria-hidden': true;
		'aria-label'?: never;
	};

	type WithoutAriaHidden = {
		'aria-label': string;
		'aria-hidden'?: false;
	};

	export type IconButtonProps = IconButtonWithoutHTML &
		(WithAriaHidden | WithoutAriaHidden) &
		(
			| Omit<ButtonBaseButtonElement, 'loadingIconPosition'>
			| Omit<ButtonBaseAnchorElement, 'loadingIconPosition'>
		);
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
		children,
		...restProps
	}: IconButtonProps = $props();

	const reactiveProps = $derived({
		href,
		'aria-hidden': ariaHidden,
		'aria-busy': isLoading || ariaBusy,
		'class': cn('size-10 p-0 rounded-full', className),
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
