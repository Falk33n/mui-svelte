<script
	lang="ts"
	module
>
	import { LoaderCircle, type IconType } from '$components/ui/icons';
	import type { WithRef } from '$types';
	import { cn } from '$utils';
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
	} from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'focus-visible:ring-ring focus-visible:ring-offset-1 gap-2 focus-visible:ring-offset-background inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium transition-all text-base duration-200 uppercase focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-5 rounded-md',
		variants: {
			variant: {
				contained:
					'bg-primary text-primary-foreground shadow-md hover:bg-primary/85',
				outlined:
					'border-input bg-background border hover:bg-accent hover:text-accent-foreground',
				text: 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				sm: 'h-8 px-3.5 text-sm [&>svg]:size-4',
				md: 'h-9 px-5',
				lg: 'h-10 px-5',
			},
		},
		defaultVariants: {
			variant: 'contained',
			size: 'md',
		},
	});

	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

	export type ButtonBaseWithoutHTML = WithRef<{
		variant?: ButtonVariant;
		size?: ButtonSize;
	}>;

	export type ButtonBaseButtonElement = HTMLButtonAttributes & {
		href?: never;
		hreflang?: never;
		ping?: never;
		referrerpolicy?: never;
		rel?: never;
		target?: never;
		download?: never;
		isLoading?: boolean;
		loadingIcon?: IconType;
	};

	export type ButtonBaseAnchorElement = Omit<HTMLAnchorAttributes, 'href'> & {
		href: string;
		type?: never;
		disabled?: never;
		autofocus?: never;
		form?: never;
		formaction?: never;
		formenctype?: never;
		formmethod?: never;
		formnovalidate?: never;
		formtarget?: never;
		name?: never;
		popovertarget?: never;
		popovertargetaction?: never;
		value?: never;
		isLoading?: never;
		loadingIcon?: never;
	};

	export type ButtonBaseProps = ButtonBaseWithoutHTML &
		(ButtonBaseButtonElement | ButtonBaseAnchorElement);
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		'class': className,
		tabindex = 0,
		variant = 'contained',
		size = 'md',
		'loadingIcon': LoadingIcon = LoaderCircle,
		href,
		target,
		rel = href
			? target === '_blank'
				? 'noopener noreferrer'
				: undefined
			: undefined,
		referrerpolicy = href
			? target === '_blank'
				? 'no-referrer'
				: undefined
			: undefined,
		type = href === undefined ? 'button' : undefined,
		isLoading = $bindable(href === undefined ? false : undefined),
		'aria-hidden': ariaHidden,
		'aria-busy': ariaBusy = href === undefined && !ariaHidden
			? isLoading
			: undefined,
		disabled = href === undefined ? isLoading || ariaBusy === true : undefined,
		children,
		...restProps
	}: ButtonBaseProps = $props();

	const mergedProps = $derived({
		type,
		disabled,
		referrerpolicy,
		href,
		target,
		rel,
		tabindex,
		'aria-busy': isLoading || ariaBusy,
		'class': cn(buttonVariants({ variant, size }), className),
		...restProps,
	});
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={ref}
	{...mergedProps}
>
	{#if isLoading || ariaBusy}
		{@render children?.()}
		<LoadingIcon class="animate-spin" />
	{:else}
		{@render children?.()}
	{/if}
</svelte:element>
