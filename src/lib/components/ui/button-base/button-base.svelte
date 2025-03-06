<script
	lang="ts"
	module
>
	import {
		buttonBaseVariants,
		type ButtonBaseProps,
	} from '$components/ui/button-base';
	import { LoaderCircleIcon } from '$components/ui/icons';
	import { cn, hslToHsla } from '$utils';

	type ButtonMouseEvent = MouseEvent & {
		currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
	};

	type ButtonFocusEvent = FocusEvent & {
		currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
	};

	type RippleEvent = ButtonMouseEvent | ButtonFocusEvent;

	type RippleShadeVariant =
		| 'primary'
		| 'destructive'
		| 'background'
		| 'foreground';
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		'class': className,
		tabindex = 0,
		variant = 'contained',
		color = 'primary',
		size = 'md',
		'loadingIcon': LoadingIcon = LoaderCircleIcon,
		loadingIconPosition = 'end',
		asFloatingAction = false,
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
		disabled = href === undefined ? isLoading : undefined,
		onclick,
		onfocus,
		children,
		...restProps
	}: ButtonBaseProps = $props();

	function createRipple(e: RippleEvent, shadeVariant: RippleShadeVariant) {
		const rect = e.currentTarget.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);

		const getPosition = () => {
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

		const { x, y } = getPosition();

		const getShadeColor = () => {
			const backgroundVariable = getComputedStyle(
				document.documentElement,
			).getPropertyValue('--color-background');
			const foregroundVariable = getComputedStyle(
				document.documentElement,
			).getPropertyValue('--color-foreground');
			const primaryVariable = getComputedStyle(
				document.documentElement,
			).getPropertyValue('--color-primary');
			const destructiveVariable = getComputedStyle(
				document.documentElement,
			).getPropertyValue('--color-destructive');

			const backgroundShadeColor = hslToHsla(backgroundVariable, 0.45);
			const foregroundShadeColor = hslToHsla(foregroundVariable, 0.25);
			const primaryShadeColor = hslToHsla(primaryVariable, 0.25);
			const destructiveShadeColor = hslToHsla(destructiveVariable, 0.25);

			if (shadeVariant === 'background') return backgroundShadeColor;
			else if (shadeVariant === 'foreground') return foregroundShadeColor;
			else if (shadeVariant === 'primary') return primaryShadeColor;
			return destructiveShadeColor;
		};

		const shadeColor = getShadeColor();

		const createElement = () => {
			const ripple = document.createElement('span');
			ripple.style.height = `${size}px`;
			ripple.style.width = `${size}px`;
			ripple.style.left = `${x}px`;
			ripple.style.top = `${y}px`;
			ripple.style.background = shadeColor;
			ripple.classList.add('ripple');
			return ripple;
		};

		const ripple = createElement();
		e.currentTarget.appendChild(ripple);

		setTimeout(() => ripple.remove(), 600);
	}

	function getShadeVariant(): RippleShadeVariant {
		if (color === 'primary') {
			if (variant === 'contained') return 'background';
			return 'primary';
		} else if (color === 'secondary') return 'foreground';
		if (variant === 'contained') return 'background';
		return 'destructive';
	}

	function handleMouseEvent(e: ButtonMouseEvent) {
		const shadeVariant: RippleShadeVariant = getShadeVariant();

		if (!e.defaultPrevented && variant !== 'link') {
			createRipple(e, shadeVariant);
		}

		// Too complex uninion type
		onclick?.(e as any);
	}

	function handleFocusEvent(e: ButtonFocusEvent) {
		const shadeVariant: RippleShadeVariant = getShadeVariant();

		if (
			!e.defaultPrevented &&
			e.currentTarget.matches(':focus-visible') &&
			variant !== 'link'
		) {
			createRipple(e, shadeVariant);
		}

		// Too complex uninion type
		onfocus?.(e as any);
	}

	if (asFloatingAction) {
		$effect(() => {
			ref?.classList.add('pop-in', 'floating-action');

			return () => {
				ref?.classList.remove('pop-in');
				ref?.classList.add('pop-out');
			};
		});
	}
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={ref}
	class={cn(
		buttonBaseVariants({
			variant,
			color,
			size,
		}),
		className,
	)}
	aria-busy={href === undefined && !ariaHidden ? isLoading : undefined}
	onclick={handleMouseEvent}
	onfocus={handleFocusEvent}
	{type}
	{disabled}
	{referrerpolicy}
	{href}
	{target}
	{rel}
	{tabindex}
	{...restProps}
>
	{#if loadingIconPosition !== 'start'}
		{@render children?.()}
	{/if}

	{#if isLoading}
		<LoadingIcon class="animate-spin" />
	{/if}

	{#if loadingIconPosition !== 'end'}
		{@render children?.()}
	{/if}
</svelte:element>

<style>
	:global(.ripple) {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		animation: ripple 0.6s linear;
		pointer-events: none;
	}

	.floating-action {
		z-index: 9999;
	}

	.pop-in {
		animation: pop-in 0.2s ease-out forwards;
	}

	.pop-out {
		animation: pop-out 0.2s ease-in forwards;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}

	@keyframes pop-in {
		from {
			transform: scale(0);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes pop-out {
		from {
			transform: scale(1);
			opacity: 1;
		}
		to {
			transform: scale(0);
			opacity: 0;
		}
	}
</style>
