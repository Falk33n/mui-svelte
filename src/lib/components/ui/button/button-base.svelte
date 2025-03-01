<script
	lang="ts"
	module
>
	import { LoaderCircle, type IconComponent } from '$components/ui/icons';
	import type { WithRef } from '$types';
	import { cn } from '$utils';
	import type {
		FocusEventHandler,
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
		MouseEventHandler,
	} from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	type ButtonMouseEvent = MouseEvent & {
		currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
	};

	type ButtonFocusEvent = FocusEvent & {
		currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
	};

	type RippleEvent = ButtonMouseEvent | ButtonFocusEvent;

	const getRipplePosition = (e: RippleEvent, size: number) => {
		const rect = e.currentTarget.getBoundingClientRect();

		if (e instanceof MouseEvent) {
			return {
				x: e.clientX - rect.left - size / 2,
				y: e.clientY - rect.top - size / 2,
			};
		}

		return {
			x: rect.width / 2 - size / 2,
			y: rect.height / 2 - size / 2,
		};
	};

	const getRippleShadeColor = (shade: 'primary' | 'foreground') => {
		const foregroundShadeColor = 'hsla(0, 0%, 98%, 0.45)';
		const primaryShadeColor = 'hsla(226, 71%, 43%, 0.25)';
		return shade === 'primary' ? primaryShadeColor : foregroundShadeColor;
	};

	const createRippleElement = (
		x: number,
		y: number,
		size: number,
		shadeColor: string,
	) => {
		const ripple = document.createElement('span');
		ripple.style.height = `${size}px`;
		ripple.style.width = `${size}px`;
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;
		ripple.style.background = shadeColor;
		ripple.classList.add('ripple-animation');
		return ripple;
	};

	const createRippleAnimation = (
		e: RippleEvent,
		shade: 'primary' | 'foreground',
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);

		const { x, y } = getRipplePosition(e, size);
		const shadeColor = getRippleShadeColor(shade);

		const ripple = createRippleElement(x, y, size, shadeColor);
		e.currentTarget.appendChild(ripple);

		setTimeout(() => ripple.remove(), 600);
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

	type ButtonMouseEventHandler =
		| MouseEventHandler<HTMLButtonElement>
		| MouseEventHandler<HTMLAnchorElement>
		| null;

	type ButtonFocusEventHandler =
		| FocusEventHandler<HTMLButtonElement>
		| FocusEventHandler<HTMLAnchorElement>
		| null;

	const handleButtonEvents = (
		e: RippleEvent,
		variant: ButtonVariant,
		onclick?: ButtonMouseEventHandler,
		onfocus?: ButtonFocusEventHandler,
	) => {
		/* 
      The `as any` on the EventHandler props fixes the type union mismatch. 
      TypeScript cannot compute the full union type, so we use 
        `as any` to bypass the limitation.  
    */

		const shadeColor = variant === 'contained' ? 'foreground' : 'primary';

		if (e instanceof MouseEvent) {
			if (!e.defaultPrevented) createRippleAnimation(e, shadeColor);
			onclick?.(e as any);
			return;
		}

		if (!e.defaultPrevented && e.currentTarget.matches(':focus-visible')) {
			createRippleAnimation(e, shadeColor);
		}

		onfocus?.(e as any);
	};

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
		loadingIcon?: IconComponent;
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
		onfocus,
		children,
		...restProps
	}: ButtonBaseProps = $props();

	const reactiveProps = $derived({
		type,
		disabled,
		referrerpolicy,
		href,
		target,
		rel,
		tabindex,
		'onclick': (e: ButtonMouseEvent) => handleButtonEvents(e, variant, onclick),
		'onfocus': (e: ButtonFocusEvent) =>
			handleButtonEvents(e, variant, undefined, onfocus),
		'aria-busy': isLoading || ariaBusy,
		'class': cn(buttonVariants({ variant, size }), className),
		...restProps,
	});
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={ref}
	{...reactiveProps}
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

<style>
	:global(.ripple-animation) {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		animation: ripple 0.6s linear;
		pointer-events: none;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
