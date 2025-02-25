<script
	lang="ts"
	module
>
	import type { WithChild, WithRef } from '$types';
	import { cn } from '$utils';
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
	} from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/85 active:scale-[99%]',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/60 active:scale-[99%]',
				outline:
					'border-input bg-background border shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-[99%]',
				ghost:
					'bg-background text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[99%]',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/85 active:scale-[99%]',
				link: 'bg-background text-primary hover:underline-offset-2 hover:underline',
			},
			size: {
				default: 'h-9 px-4',
				sm: 'h-8 px-3.5 text-sm',
				lg: 'h-10 px-5',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	});

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
		variant = 'default',
		size = 'default',
		referrerpolicy,
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
