<script lang="ts">
	import { LoaderCircle } from '$components/ui/data-display/icons';
	import { Button } from '$components/ui/inputs/button';
	import { ButtonGroup } from '$components/ui/inputs/button-group';
</script>

<div class="mb-20 w-full">d</div>
<div class="ml-12 flex items-center gap-2">
	<ButtonGroup
		aria-label="helo"
		variant="outlined"
	>
		<Button startIcon={LoaderCircle}>Hello</Button>
		<Button
			startIcon={LoaderCircle}
			endIcon={LoaderCircle}>Hellssssssssssssssssso</Button
		>
		<Button startIcon={LoaderCircle}>Hello</Button>
	</ButtonGroup>
</div>
