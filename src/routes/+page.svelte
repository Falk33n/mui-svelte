<script lang="ts">
	import { Label } from '../lib/components/ui/forms/descriptions/label';
	import TextFieldBase from '../lib/components/ui/forms/fields/text-field/base/text-field-base.svelte';

	let placeholder = '';

	let value = $state<string | undefined>();

	const isPlaceholderShown = $derived(
		(value === undefined || value === '') && placeholder !== undefined,
	);
</script>

<div class="mb-20 w-full">d</div>
<div class="mx-12 flex items-center gap-2">
	<div
		class="group relative size-fit space-y-2"
		data-placeholder-shown={isPlaceholderShown}
	>
		<Label
			for="test"
			class="-placeholder-shown:text-red-500 absolute top-0 left-0 mt-3 min-h-11 pt-3.5 pl-5 transition-all duration-200 group-data-[placeholder-shown=false]:mt-0 group-data-[placeholder-shown=false]:pt-1.5 peer-focus-visible:mt-0 peer-focus-visible:pt-1.5"
			>hello</Label
		>
		<TextFieldBase
			variant="filled"
			bind:value
			size="lg"
			id="test"
			{placeholder}
		/>
	</div>
</div>
