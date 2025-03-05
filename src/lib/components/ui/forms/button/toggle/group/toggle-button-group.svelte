<script
	lang="ts"
	module
>
	import {
		toggleButtonGroupVariants,
		type ToggleButtonGroupColor,
		type ToggleButtonGroupOrientation,
		type ToggleButtonGroupSize,
	} from '$components/ui/forms/button/toggle/group';
	import type { WithRef } from '$types';
	import { cn } from '$utils';
	import { getContext, hasContext, setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type WithoutHTML = WithRef<{
		color?: ToggleButtonGroupColor;
		size?: ToggleButtonGroupSize;
		orientation?: ToggleButtonGroupOrientation;
		exclusiveSelection?: boolean;
		enforcedSelection?: boolean;
	}>;

	type ContextProps = Required<Omit<WithoutHTML, 'ref' | 'orientation'>> & {
		selectedButton: { refs: (HTMLElement | null)[] };
	};

	export type ToggleButtonGroupProps = WithoutHTML &
		Omit<
			HTMLAttributes<HTMLDivElement>,
			'aria-label' | 'role' | 'aria-orientation'
		> & {
			'aria-label': string;
		};

	const CONTEXT_NAME = 'toggle-button-group';

	export function getToggleButtonGroupContext() {
		if (!hasContext(CONTEXT_NAME)) return;
		return getContext<ContextProps>(CONTEXT_NAME);
	}

	function createContext(props: ContextProps) {
		return setContext<ContextProps>(CONTEXT_NAME, props);
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
