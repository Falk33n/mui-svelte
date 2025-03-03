<script lang="ts">
	import type { IconProps } from '$components/ui/data-display/icons';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		'class': className,
		'aria-hidden': ariaHidden = true,
		'stroke-width': strokeWidth = '2',
		'stroke-linecap': strokeLineCap = 'round',
		'stroke-linejoin': strokeLineJoin = 'round',
		stroke = 'currentColor',
		xmlns = 'http://www.w3.org/2000/svg',
		width = '24',
		height = '24',
		viewBox = '0 0 24 24',
		fill = 'none',
		...restProps
	}: IconProps = $props();
</script>

<svg
	bind:this={ref}
	class={className ? cn(className) : undefined}
	aria-hidden={ariaHidden}
	stroke-width={strokeWidth}
	stroke-linecap={strokeLineCap}
	stroke-linejoin={strokeLineJoin}
	{xmlns}
	{width}
	{height}
	{viewBox}
	{stroke}
	{fill}
	{...restProps}
>
	<path d="M21 12a9 9 0 1 1-6.219-8.56" />
</svg>
