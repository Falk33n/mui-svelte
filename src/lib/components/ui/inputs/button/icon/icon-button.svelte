<script
	lang="ts"
	module
>
	import {
		ButtonBase,
		type ButtonBaseAnchorElement,
		type ButtonBaseButtonElement,
		type ButtonBaseWithoutHTML,
	} from '$components/ui/inputs/button/base';
	import {
		iconButtonVariants,
		type IconButtonSize,
	} from '$components/ui/inputs/button/icon';
	import { cn } from '$utils';

	type WithoutHTML = Omit<ButtonBaseWithoutHTML, 'size'> & {
		size?: IconButtonSize;
	};

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
