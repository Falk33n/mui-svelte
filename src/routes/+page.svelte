<script lang="ts">
	import { Button, IconButton } from '$components/ui/button';
	import { LoaderCircle } from '$components/ui/icons';
</script>

<div class="mb-20 w-full">d</div>
<div class="flex items-center gap-2">
	<Button
		size="sm"
		startIcon={LoaderCircle}>Hello</Button
	>

	<Button
		size="md"
		startIcon={LoaderCircle}
		endIcon={LoaderCircle}>Hello</Button
	>

	<Button
		size="lg"
		startIcon={LoaderCircle}>Hello</Button
	>

	<IconButton aria-label="Loading"><LoaderCircle /></IconButton>
</div>
