<script
	lang="ts"
	module
>
	import type { SvelteMouseEvent, WithChild, WithRef } from '$types';
	import { cn } from '$utils';
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
	} from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'relative overflow-hidden focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-secondary disabled:text-secondary-foreground',
		variants: {
			variant: {
				text: 'bg-transparent hover:bg-primary/10 text-primary',
				contained:
					'bg-primary text-primary-foreground shadow-md hover:bg-primary/80',
				outlined:
					'border-primary/70 bg-transparent border text-primary hover:bg-primary/10 disabled:border-secondary-foreground/40',
			},
			size: {
				sm: 'h-8 px-3.5 text-sm',
				md: 'h-9 px-4',
				lg: 'h-10 px-5',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'contained',
			size: 'md',
		},
	});

	const createRipple = (
		e: SvelteMouseEvent,
		shade: 'primary' | 'foreground',
	) => {
		const target = e.currentTarget as HTMLElement;
		const ripple = document.createElement('span');

		const rect = target.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;

		const foregroundShadeColor = 'hsla(0, 0%, 98%, 0.45)';
		const primaryShadeColor = 'hsla(226, 71%, 43%, 0.25)';
		const shadeColor =
			shade === 'primary' ? primaryShadeColor : foregroundShadeColor;

		ripple.style.height = `${size}px`;
		ripple.style.width = `${size}px`;
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;
		ripple.style.background = `${shadeColor}`;
		ripple.classList.add('ripple-effect');

		target.appendChild(ripple);

		setTimeout(() => {
			ripple.remove();
		}, 450);
	};

	export type WithButtonSize = {
		size?: VariantProps<typeof buttonVariants>['size'];
	};

	export type WithButtonVariant = {
		variant?: VariantProps<typeof buttonVariants>['variant'];
	};

	type ButtonBaseProps = WithButtonSize &
		WithButtonVariant &
		WithChild<HTMLButtonAttributes> &
		WithRef;

	type ButtonElement = HTMLButtonAttributes & {
		href?: never;
		hreflang?: never;
		ping?: never;
		referrerpolicy?: never;
		rel?: never;
		target?: never;
		download?: never;
	};

	type AnchorElement = HTMLButtonAttributes & {
		href?: HTMLAnchorAttributes['href'];
		hreflang?: HTMLAnchorAttributes['hreflang'];
		ping?: HTMLAnchorAttributes['ping'];
		referrerpolicy?: HTMLAnchorAttributes['referrerpolicy'];
		rel?: HTMLAnchorAttributes['rel'];
		target?: HTMLAnchorAttributes['target'];
		download?: HTMLAnchorAttributes['download'];
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
	};

	export type ButtonProps = ButtonBaseProps & (ButtonElement | AnchorElement);
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		tabindex = 0,
		variant = 'contained',
		size = 'md',
		download,
		hreflang,
		ping,
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
		disabled = href === undefined ? false : undefined,
		autofocus,
		form,
		formaction,
		formenctype,
		formmethod,
		formnovalidate,
		formtarget,
		name,
		popovertarget,
		popovertargetaction,
		value,
		onclick,
		children,
		child,
		...restProps
	}: ButtonProps = $props();

	const mergedProps = $derived<ButtonElement | AnchorElement>({
		...(href
			? { href, hreflang, download, ping, referrerpolicy, target, rel }
			: {
					type,
					disabled,
					autofocus,
					form,
					formaction,
					formtarget,
					formenctype,
					formnovalidate,
					formmethod,
					name,
					popovertarget,
					popovertargetaction,
					value,
				}),
		onclick: (e) => {
			if (!e.defaultPrevented) {
				createRipple(e, variant === 'contained' ? 'foreground' : 'primary');
			}
			onclick?.(e);
		},
		tabindex,
		class: cn(buttonVariants({ variant, size }), className),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<svelte:element
		this={href ? 'a' : 'button'}
		bind:this={ref}
		{...mergedProps}
	>
		{@render children?.()}
	</svelte:element>
{/if}

<style>
	:global(.ripple-effect) {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		animation: ripple 0.45s linear;
		pointer-events: none;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
