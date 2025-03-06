<script lang="ts">
	import { Label } from '$components/ui/label';
	import {
		textFieldLabelVariants,
		type FormTextFieldLabelProps,
	} from '$components/ui/text-field-label';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'outlined',
		color = 'primary',
		size = 'md',
		multipleLines = false,
		children,
		...restProps
	}: FormTextFieldLabelProps = $props();
</script>

<Label
	bind:ref
	class={cn(
		textFieldLabelVariants({ variant, color, size, multipleLines }),
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</Label>
