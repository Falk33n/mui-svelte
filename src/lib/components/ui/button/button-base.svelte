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

	type SvelteMouseEvent = MouseEvent & {
		currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
	};

	const createRipple = (
		e: SvelteMouseEvent,
		shade: 'primary' | 'foreground',
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;

		const foregroundShadeColor = 'hsla(0, 0%, 98%, 0.45)';
		const primaryShadeColor = 'hsla(226, 71%, 43%, 0.25)';
		const shadeColor =
			shade === 'primary' ? primaryShadeColor : foregroundShadeColor;

		const ripple = document.createElement('span');
		ripple.style.height = `${size}px`;
		ripple.style.width = `${size}px`;
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;
		ripple.style.background = `${shadeColor}`;
		ripple.classList.add('ripple-animation');

		e.currentTarget.appendChild(ripple);

		setTimeout(() => {
			ripple.remove();
		}, 450);
	};

	export const buttonVariants = tv({
		base: 'relative overflow-hidden focus-visible:ring-ring gap-2 inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium transition-all text-base duration-200 uppercase focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-50 [&>svg]:size-5 rounded-md',
		variants: {
			variant: {
				text: 'bg-transparent hover:bg-primary/10 text-primary',
				contained:
					'bg-primary text-primary-foreground shadow-md hover:bg-primary/80',
				outlined:
					'border-primary/70 bg-transparent border text-primary hover:bg-primary/10 disabled:border-secondary-foreground/40',
			},
			color: {
				primary: '',
				secondary: '',
				destructive: '',
			},
			size: {
				sm: 'h-8 px-3.5 text-sm [&>svg]:size-4',
				md: 'h-9 px-5',
				lg: 'h-10 px-5',
			},
		},
		defaultVariants: {
			variant: 'contained',
			color: 'primary',
			size: 'md',
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

	export type ButtonColor = VariantProps<typeof buttonVariants>['color'];

	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonBaseWithoutHTML = WithRef<{
		variant?: ButtonVariant;
		color?: ButtonColor;
		size?: ButtonSize;
	}>;

	export type ButtonBaseButtonElement = Omit<HTMLButtonAttributes, 'color'> & {
		href?: never;
		hreflang?: never;
		ping?: never;
		referrerpolicy?: never;
		rel?: never;
		target?: never;
		download?: never;
		isLoading?: boolean;
		loadingIcon?: IconType;
		loadingIconPosition?: 'start' | 'end';
	};

	export type ButtonBaseAnchorElement = Omit<
		HTMLAnchorAttributes,
		'href' | 'color'
	> & {
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
		loadingIconPosition?: never;
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
		loadingIconPosition = 'end',
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
		onclick,
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
		'onclick': (e: SvelteMouseEvent) => {
			if (!e.defaultPrevented) {
				createRipple(e, variant === 'contained' ? 'foreground' : 'primary');
			}

			/* 
        The `as any` on the event fixes the type union mismatch. 
        TypeScript cannot compute the full union type, so we use 
          `as any` to bypass the limitation.  
      */
			onclick?.(e as any);
		},
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
		{#if loadingIconPosition === 'end'}
			{@render children?.()}
		{/if}

		<LoadingIcon class="animate-spin" />

		{#if loadingIconPosition === 'start'}
			{@render children?.()}
		{/if}
	{:else}
		{@render children?.()}
	{/if}
</svelte:element>
