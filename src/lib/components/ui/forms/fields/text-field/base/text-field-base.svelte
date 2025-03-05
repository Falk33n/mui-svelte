<script
	lang="ts"
	module
>
	import {
		textFieldVariants,
		type TextFieldColor,
		type TextFieldSize,
		type TextFieldVariant,
	} from '$components/ui/forms/fields/text-field/base';
	import type { WithoutChildren, WithRef } from '$types';
	import { cn } from '$utils';
	import type {
		HTMLInputAttributes,
		HTMLTextareaAttributes,
	} from 'svelte/elements';

	type WithoutHTML = WithRef<{
		variant?: TextFieldVariant;
		color?: TextFieldColor;
		size?: TextFieldSize;
	}>;

	type TextareaElement = WithoutChildren<
		Omit<HTMLTextareaAttributes, 'aria-label' | 'aria-labelledby' | 'value'>
	> & {
		value?: HTMLTextareaAttributes['value'];
		accept?: never;
		alt?: never;
		capture?: never;
		checked?: never;
		formaction?: never;
		formenctype?: never;
		formmethod?: never;
		formnovalidate?: never;
		formtarget?: never;
		height?: never;
		list?: never;
		max?: never;
		min?: never;
		multiple?: never;
		pattern?: never;
		popovertarget?: never;
		popovertargetaction?: never;
		src?: never;
		step?: never;
		width?: never;
		multipleLines?: true;
	};

	type InputElement = WithoutChildren<
		Omit<
			HTMLInputAttributes,
			'aria-label' | 'aria-labelledby' | 'size' | 'value'
		>
	> & {
		value?: HTMLTextareaAttributes['value'];
		autocorrect?: never;
		cols?: never;
		rows?: never;
		spellcheck?: never;
		wrap?: never;
		multipleLines?: false;
	};

	export type TextFieldProps = WithoutHTML & (TextareaElement | InputElement);
</script>

<script lang="ts">
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
  Since we can't add comments inside HTML tags.
  So we can't use svelte:element here since it doesnt recognize the element is correct.
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
