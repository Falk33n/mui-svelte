<script lang="ts">
	import { Label } from '../lib/components/ui/forms/descriptions/label';
	import TextFieldBase from '../lib/components/ui/forms/fields/text-field/base/text-field-base.svelte';
</script>

<div class="mb-20 w-full">d</div>
<div class="flex items-center gap-2 mx-12">
	<div class="relative space-y-2 size-fit">
		<TextFieldBase
			variant="filled"
			size="lg"
			id="test"
		/>
		<Label
			for="test"
			class="peer-focus-visible:mt-0 peer-focus-visible:pt-1.5 top-0 left-0 absolute mt-3 pt-3.5 pl-5 min-h-11 peer-placeholder-shown:text-red-500 transition-all duration-200"
			>hello</Label
		>
	</div>
</div>
