<script
	lang="ts"
	module
>
	import { LoaderCircle } from '$components/ui/data-display/icons';
	import {
		buttonBaseVariants,
		handleButtonBaseEvents,
		type ButtonBaseFocusEvent,
		type ButtonBaseMouseEvent,
		type ButtonBaseProps,
	} from '$components/ui/inputs/button-base';
	import { cn } from '$utils';
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		'class': className,
		tabindex = 0,
		variant = 'contained',
		color = 'primary',
		size = 'md',
		'loadingIcon': LoadingIcon = LoaderCircle,
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
		'aria-busy': isLoading || ariaBusy || undefined,
		'onclick': (e: ButtonBaseMouseEvent) =>
			handleButtonBaseEvents(e, variant, color, onclick),
		'onfocus': (e: ButtonBaseFocusEvent) =>
			handleButtonBaseEvents(e, variant, color, undefined, onfocus),
		'class': cn(
			buttonBaseVariants({
				variant,
				color,
				size,
			}),
			className,
		),
		...restProps,
	});

	if (asFloatingAction) {
		$effect(() => {
			if (!ref) return;
			ref.classList.add('pop-in', 'floating-action');

			return () => {
				if (!ref) return;
				ref.classList.remove('pop-in');
				ref.classList.add('pop-out');
			};
		});
	}
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={ref}
	{...reactiveProps}
>
	{#if loadingIconPosition !== 'start'}
		{@render children?.()}
	{/if}

	{#if isLoading || ariaBusy}
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
