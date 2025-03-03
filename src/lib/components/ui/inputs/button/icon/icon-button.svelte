<script
	lang="ts"
	module
>
	type WithoutHTML = ButtonBaseWithoutHTML;

	type WithAriaHidden = {
		'aria-hidden': true;
		'aria-label'?: never;
	};

	type WithoutAriaHidden = {
		'aria-label': string;
		'aria-hidden'?: false;
	};

	export type IconButtonProps = WithoutHTML &
		(WithAriaHidden | WithoutAriaHidden) &
		(
			| Omit<ButtonBaseButtonElement, 'loadingIconPosition'>
			| Omit<ButtonBaseAnchorElement, 'loadingIconPosition'>
		);
</script>

<script lang="ts">
	import {
		ButtonBase,
		type ButtonBaseAnchorElement,
		type ButtonBaseButtonElement,
		type ButtonBaseWithoutHTML,
	} from '$components/ui/inputs/button/base';
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

<!-- 
  The `as any` on the `restProps` spread fixes the following error... 
    "Expression produces a union type that is too complex to represent (TS2590)".  
  TypeScript cannot compute the full union type, so we use 
    `as any` to bypass the limitation.  
-->
<ButtonBase
	bind:ref
	bind:isLoading
	aria-hidden={ariaHidden}
	aria-busy={href === undefined && !ariaHidden ? isLoading : undefined}
	class={cn(
		'rounded-full px-[unset]',
		size === 'sm'
			? 'size-8 [&>svg]:size-5'
			: size === 'md'
				? 'size-10 [&>svg]:size-6'
				: 'size-12 [&>svg]:size-7',
		className,
	)}
	{href}
	{...restProps as any}
>
	{#if !isLoading}
		{@render children?.()}
	{/if}
</ButtonBase>
