<script
	lang="ts"
	module
>
	import type { IconComponent } from '$components/ui/data-display/icons';
	import type {
		ButtonBaseAnchorElement,
		ButtonBaseButtonElement,
		ButtonBaseWithoutHTML,
	} from '$components/ui/forms/button/base';
	import { ButtonBase } from '$components/ui/forms/button/base';
	import { getButtonGroupContext } from '$components/ui/forms/button/group';
	import { cn } from '$utils';

	type ButtonWithoutHTML = ButtonBaseWithoutHTML & {
		startIcon?: IconComponent;
		endIcon?: IconComponent;
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
