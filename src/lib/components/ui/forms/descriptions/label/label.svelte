<script
	lang="ts"
	module
>
	import type { WithRef } from '$types';
	import { cn } from '$utils';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	export type LabelProps = WithRef<HTMLLabelAttributes>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: LabelProps = $props();
</script>

<label
	bind:this={ref}
	class={cn(
		'leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</label>
