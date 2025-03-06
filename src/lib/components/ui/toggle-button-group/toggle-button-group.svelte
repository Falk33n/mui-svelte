<script
	lang="ts"
	module
>
	import {
		toggleButtonGroupVariants,
		type ToggleButtonGroupColor,
		type ToggleButtonGroupProps,
		type ToggleButtonGroupSize,
	} from '$components/ui/toggle-button-group';
	import { cn } from '$utils';
	import { getContext, hasContext, setContext } from 'svelte';

	type ContextProps = {
		selectedButton: { refs: (HTMLElement | null)[] };
		color: NonNullable<ToggleButtonGroupColor>;
		size: NonNullable<ToggleButtonGroupSize>;
		exclusiveSelection: boolean;
		enforcedSelection: boolean;
	};

	const CONTEXT_NAME = 'toggle-button-group';

	export function getToggleButtonGroupContext() {
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
		color = 'primary',
		size = 'md',
		orientation = 'horizontal',
		exclusiveSelection = false,
		enforcedSelection = false,
		children,
		...restProps
	}: ToggleButtonGroupProps = $props();

	let selectedButton = $state<{ refs: (HTMLElement | null)[] }>({ refs: [] });

	createContext({
		color,
		size,
		exclusiveSelection,
		enforcedSelection,
		selectedButton,
	});
</script>

<div
	bind:this={ref}
	role="group"
	class={cn(
		toggleButtonGroupVariants({
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
