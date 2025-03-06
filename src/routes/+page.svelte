<script lang="ts">
	import { TextField } from '../lib/components/ui/text-field';
	import { TextFieldLabel } from '../lib/components/ui/text-field-label';

	let placeholder = undefined;
	let disabled = false;
	let required = true;
	let value = $state<string | undefined>();
	let isInvalid = $state(false);
</script>

<div class="mb-20 w-full">d</div>
<div class="mx-12 flex items-center gap-2">
	<!-- to the form we will add novalidate to prevent browser defaults -->
	<!--  -->
	<!-- FormTextField -->
	<!--  -->
	<!-- FormControl -->
	<div
		class="group my-3 h-fit w-full space-y-1"
		data-input-placeholder-shown={((value === undefined || value === '') &&
			placeholder !== undefined) ||
			undefined}
		data-input-has-value={(value !== undefined && value !== '') || undefined}
		data-input-disabled={disabled || undefined}
		data-input-invalid={isInvalid || undefined}
		data-input-required={required || undefined}
	>
		<!-- FormTextField -->
		<!-- FormField -->
		<div class="relative">
			<TextFieldLabel
				for="test"
				variant="filled"
				color="secondary"
				size="lg">hello</TextFieldLabel
			>
			<TextField
				variant="filled"
				bind:value
				size="lg"
				color="secondary"
				id="test"
				aria-describedby="test-desc"
				aria-invalid={isInvalid}
				{required}
				{disabled}
				{placeholder}
			/>
		</div>
		<!--  -->
		<!-- Form Description can change to be a description or an error message -->
		<p
			id="test-desc"
			class="group-data-[input-invalid]:text-destructive pl-5"
		>
			desc
		</p>
	</div>
	<!--  -->
</div>
