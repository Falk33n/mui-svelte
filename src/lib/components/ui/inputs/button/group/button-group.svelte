<script
	lang="ts"
	module
>
	type WithoutHTML = WithRef<{
		variant?: ButtonGroupVariant;
		color?: ButtonGroupColor;
		size?: ButtonGroupSize;
		orientation?: ButtonGroupOrientation;
	}>;

	export type ButtonGroupProps = WithoutHTML &
		Omit<
			HTMLAttributes<HTMLDivElement>,
			'aria-label' | 'role' | 'aria-orientation'
		> & {
			'aria-label': string;
		};

	type ContextProps = Required<Omit<WithoutHTML, 'ref' | 'orientation'>>;

	const CONTEXT_NAME = 'button-group';

	export const getButtonGroupContext = () => {
		if (!hasContext(CONTEXT_NAME)) return;
		return getContext<ContextProps>(CONTEXT_NAME);
	};

	function createContext(props: ContextProps) {
		return setContext<ContextProps>(CONTEXT_NAME, props);
	}
</script>

<script lang="ts">
	import {
		buttonGroupVariants,
		type ButtonGroupColor,
		type ButtonGroupOrientation,
		type ButtonGroupSize,
		type ButtonGroupVariant,
	} from '$components/ui/inputs/button/group';
	import type { WithRef } from '$types';
	import { cn } from '$utils';
	import { getContext, hasContext, setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'contained',
		color = 'primary',
		size = 'md',
		orientation = 'horizontal',
		children,
		...restProps
	}: ButtonGroupProps = $props();

	createContext({ variant, color, size });
</script>

<div
	bind:this={ref}
	role="group"
	class={cn(
		buttonGroupVariants({
			variant,
			color,
			size,
			orientation,
		}),
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
