<script lang="ts">
	import { LoaderCircle } from '$components/ui/data-display/icons';
	import { ToggleButton } from '$components/ui/inputs/button/toggle';
	import { ToggleButtonGroup } from '$components/ui/inputs/button/toggle/group';
</script>

<div class="mb-20 w-full">d</div>
<div class="ml-12 flex items-center gap-2">
	<ToggleButtonGroup
		enforcedSelection
		exclusiveSelection
		aria-label="helo"
	>
		<ToggleButton
			aria-label="hello"
			value="loading-1"><LoaderCircle /></ToggleButton
		>
		<ToggleButton
			aria-label="hello"
			value="loading-2"><LoaderCircle /></ToggleButton
		>
		<ToggleButton
			aria-label="hello"
			value="loading-3"><LoaderCircle /></ToggleButton
		>
		<ToggleButton
			aria-label="hello"
			value="loading-4"><LoaderCircle /></ToggleButton
		>
	</ToggleButtonGroup>
</div>
