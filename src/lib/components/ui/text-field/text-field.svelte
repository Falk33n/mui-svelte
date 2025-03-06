<script lang="ts">
	import {
		textFieldVariants,
		type TextFieldProps,
	} from '$components/ui/text-field';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		variant = 'outlined',
		color = 'primary',
		size = 'md',
		multipleLines = false,
		...restProps
	}: TextFieldProps = $props();

	const reactiveProps = $derived({
		class: cn(
			textFieldVariants({ variant, color, size, multipleLines }),
			className,
		),
		...restProps,
	});
</script>

<!-- 
  There is currently no way to ignore the error about invalid bind:value 
  Since we can't add comments inside the attributes of HTML tags.
  So we can't use svelte:element here since it doesnt recognize that the element is correct.
-->

<!-- Too complex uninion type -->
{#if multipleLines}
	<textarea
		bind:this={ref}
		bind:value
		{...reactiveProps as any}
	></textarea>
{:else}
	<input
		bind:this={ref}
		bind:value
		{...reactiveProps as any}
	/>
{/if}
