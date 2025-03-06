<script
	lang="ts"
	module
>
	import {
		buttonGroupVariants,
		type ButtonGroupColor,
		type ButtonGroupProps,
		type ButtonGroupSize,
		type ButtonGroupVariant,
	} from '$components/ui/button-group';
	import { cn } from '$utils';
	import { getContext, hasContext, setContext } from 'svelte';

	type ContextProps = {
		variant: ButtonGroupVariant;
		color: ButtonGroupColor;
		size: ButtonGroupSize;
	};

	const CONTEXT_NAME = 'button-group';

	export function getButtonGroupContext() {
		if (!hasContext(CONTEXT_NAME)) return;
		return getContext<ContextProps>(CONTEXT_NAME);
	}

	function createContext(props: ContextProps) {
		setContext<ContextProps>(CONTEXT_NAME, props);
	}
</script>

<script lang="ts">
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
