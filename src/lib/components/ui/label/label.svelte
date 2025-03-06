<script lang="ts">
	import type { LabelProps } from '$components/ui/label';
	import { cn } from '$utils';

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
		'text-base leading-none font-medium peer-disabled:pointer-events-none peer-disabled:opacity-50',
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</label>
